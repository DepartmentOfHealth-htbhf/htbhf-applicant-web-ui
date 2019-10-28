const httpStatus = require('http-status-codes')
const request = require('request-promise')
const { path } = require('ramda')
const { validationResult } = require('express-validator')

const { wrapError } = require('../common/formatters')
const { logger } = require('../../../logger')
const { REQUEST_ID_HEADER } = require('../../../server/headers')
const { stateMachine, states, actions } = require('../common/state-machine')
const { createRequestBody } = require('./create-request-body')
const { isErrorStatusCode } = require('./predicates')
const { CLAIMS_ENDPOINT, NO_ELIGIBILITY_STATUS_MESSAGE } = require('./constants')
const { render } = require('./get')

const { COMPLETED } = states
const { GET_NEXT_PATH, SET_NEXT_ALLOWED_PATH } = actions

const handleErrorResponse = (body, response) => {
  if (isErrorStatusCode(response.statusCode)) {
    throw new Error(JSON.stringify(body))
  }

  return response
}

const postTermsAndConditions = (steps, config) => (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.locals.errors = errors.array()
    res.locals.errorTitleText = req.t('validation:errorTitleText')
    return render(res, req)
  }

  logger.info('Sending claim', { req })

  return request.post({
    uri: `${config.environment.CLAIMANT_SERVICE_URL}${CLAIMS_ENDPOINT}`,
    json: true,
    headers: {
      'X-Request-ID': req.headers[REQUEST_ID_HEADER],
      'X-Session-ID': req.sessionID
    },
    body: createRequestBody(config, steps, req),
    simple: false,
    transform: handleErrorResponse
  })
    .then(
      (response) => {
        const responseBody = path(['body'], response)
        const { eligibilityStatus, voucherEntitlement, claimUpdated } = responseBody

        if (!eligibilityStatus) {
          return next(wrapError({
            cause: new Error(NO_ELIGIBILITY_STATUS_MESSAGE),
            message: NO_ELIGIBILITY_STATUS_MESSAGE,
            statusCode: response.statusCode
          }))
        }

        req.session.eligibilityStatus = eligibilityStatus
        req.session.voucherEntitlement = voucherEntitlement
        req.session.claimUpdated = claimUpdated

        stateMachine.setState(COMPLETED, req)
        const nextAllowedPath = stateMachine.dispatch(GET_NEXT_PATH, req, steps, req.path)
        stateMachine.dispatch(SET_NEXT_ALLOWED_PATH, req, nextAllowedPath)
        return res.redirect('confirm')
      },
      (error) => {
        next(wrapError({
          cause: error,
          message: 'Error posting to claimant service',
          statusCode: path(['response', 'statusCode'], error) || httpStatus.INTERNAL_SERVER_ERROR
        }))
      }
    )
}

module.exports = {
  handleErrorResponse,
  postTermsAndConditions
}

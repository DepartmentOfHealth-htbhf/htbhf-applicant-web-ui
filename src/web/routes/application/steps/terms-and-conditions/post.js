const httpStatus = require('http-status-codes')
const request = require('request-promise')
const { path } = require('ramda')
const { validationResult } = require('express-validator')

const { wrapError } = require('../../errors')
const { logger } = require('../../../../logger')
const { REQUEST_ID_HEADER } = require('../../../../server/headers')
const { stateMachine, states, actions } = require('../../flow-control')
const { createRequestBody } = require('./create-request-body')
const { isErrorStatusCode } = require('./predicates')
const { NO_ELIGIBILITY_STATUS_MESSAGE } = require('./constants')
const { render } = require('./get')
const { DECISION_URL, prefixPath } = require('../../paths')

const { COMPLETED } = states
const { INCREMENT_NEXT_ALLOWED_PATH } = actions

const handleErrorResponse = (body, response) => {
  if (isErrorStatusCode(response.statusCode)) {
    throw new Error(JSON.stringify(body))
  }

  return response
}

const postTermsAndConditions = (config, journey) => (req, res, next) => {
  const errors = validationResult(req)
  const { steps, pathPrefix } = journey

  if (!errors.isEmpty()) {
    res.locals.errors = errors.array()
    res.locals.errorTitleText = req.t('validation:errorTitleText')
    return render(req, res, journey)
  }

  logger.info('Sending claim', { req })

  return request.post({
    uri: `${config.environment.CLAIMANT_SERVICE_URL}${journey.endpoint}`,
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
        const { eligibilityStatus, voucherEntitlement, verificationResult } = responseBody

        if (!eligibilityStatus) {
          return next(wrapError({
            cause: new Error(NO_ELIGIBILITY_STATUS_MESSAGE),
            message: NO_ELIGIBILITY_STATUS_MESSAGE,
            statusCode: response.statusCode
          }))
        }

        req.session.eligibilityStatus = eligibilityStatus
        req.session.voucherEntitlement = voucherEntitlement
        req.session.verificationResult = verificationResult

        stateMachine.setState(COMPLETED, req, journey)
        stateMachine.dispatch(INCREMENT_NEXT_ALLOWED_PATH, req, journey)
        return res.redirect(prefixPath(pathPrefix, DECISION_URL))
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

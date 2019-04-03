const httpStatus = require('http-status-codes')
const request = require('request-promise')
const { path } = require('ramda')

const { wrapError } = require('../common/formatters')
const { logger } = require('../../../logger')
const { REQUEST_ID_HEADER } = require('../../../server/headers')
const { stateMachine, states, actions } = require('../common/state-machine')
const { createRequestBody } = require('./create-request-body')

const CLAIMS_ENDPOINT = `/v1/claims`

const isStatusCodeInSuccessRange = statusCode => statusCode >= 200 && statusCode <= 299

const isSuccessStatusCode = statusCode => isStatusCodeInSuccessRange(statusCode) || statusCode === 404

const isErrorStatusCode = statusCode => !isSuccessStatusCode(statusCode)

const transformResponse = (body, response) => {
  if (isErrorStatusCode(response.statusCode)) {
    throw new Error('Error posting to claimant service')
  }

  return response
}

const postCheck = (steps, config) => (req, res, next) => {
  logger.info('Sending claim', { req })

  return request.post({
    uri: `${config.environment.CLAIMANT_SERVICE_URL}${CLAIMS_ENDPOINT}`,
    json: true,
    headers: {
      'X-Request-ID': req.headers[REQUEST_ID_HEADER],
      'X-Session-ID': req.sessionID
    },
    body: {
      claimant: createRequestBody(req.session.claim)
    },
    simple: false,
    transform: transformResponse
  })
    .then(
      () => {
        stateMachine.setState(states.COMPLETED, req)
        req.session.nextAllowedStep = stateMachine.dispatch(actions.GET_NEXT_PATH, req, steps, req.path)
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
  transformResponse,
  postCheck
}

const httpStatus = require('http-status-codes')
const request = require('request-promise')

const { wrapError } = require('../common/formatters')
const { logger } = require('../../../logger')
const { REQUEST_ID_HEADER } = require('../../../server/headers')
const { stateMachine, states, actions } = require('../common/state-machine')
const { createRequestBody } = require('./create-request-body')

const CLAIMS_ENDPOINT = `/v1/claims`

const postCheck = (steps, config) => async (req, res, next) => {
  try {
    await request.post({
      uri: `${config.environment.CLAIMANT_SERVICE_URL}${CLAIMS_ENDPOINT}`,
      json: true,
      headers: {
        'X-Request-ID': req.headers[REQUEST_ID_HEADER],
        'X-Session-ID': req.sessionID
      },
      body: {
        claimant: createRequestBody(req.session.claim)
      }
    })

    logger.info('Sent claim', { req })

    stateMachine.setState(states.COMPLETED, req)
    req.session.nextAllowedStep = stateMachine.dispatch(actions.GET_NEXT_PATH, req, steps, req.path)
    return res.redirect('confirm')
  } catch (error) {
    next(wrapError({
      cause: error,
      message: 'Error posting to claimant service',
      statusCode: httpStatus.INTERNAL_SERVER_ERROR
    }))
  }
}

module.exports = {
  postCheck
}

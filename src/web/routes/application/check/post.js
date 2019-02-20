const httpStatus = require('http-status-codes')
const request = require('request-promise')

const { toDateString, wrapError } = require('../common/formatters')
const { YES } = require('../common/constants')
const { logger } = require('../../../logger')

const CLAIMS_ENDPOINT = `/v1/claims`

const createExpectedDeliveryDate = (claim) => {
  if (claim.areYouPregnant === YES) {
    return toDateString(
      claim['expectedDeliveryDate-day'],
      claim['expectedDeliveryDate-month'],
      claim['expectedDeliveryDate-year']
    )
  }
  return null
}

const createRequestBody = (claim) => {
  return {
    firstName: claim.firstName,
    lastName: claim.lastName,
    nino: claim.nino,
    dateOfBirth: claim.dateOfBirth,
    cardDeliveryAddress: {
      addressLine1: claim.addressLine1,
      addressLine2: claim.addressLine2,
      townOrCity: claim.townOrCity,
      postcode: claim.postcode
    },
    expectedDeliveryDate: createExpectedDeliveryDate(claim)
  }
}

const postCheck = (config) => async (req, res, next) => {
  try {
    await request.post({
      uri: `${config.environment.CLAIMANT_SERVICE_URL}${CLAIMS_ENDPOINT}`,
      json: true,
      headers: {
        'X-Request-ID': req.headers['X-Request-ID'],
        'X-Session-ID': req.sessionID
      },
      body: {
        claimant: createRequestBody(req.session.claim)
      }
    })

    logger.info('Sent claim', { req })
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
  postCheck,
  createRequestBody
}

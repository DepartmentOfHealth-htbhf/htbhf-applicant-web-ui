const request = require('request-promise')
const { validationResult } = require('express-validator')

const { transformOsPlacesApiResponse } = require('./adapters')
const { logger } = require('../../../../logger')
const { stateMachine, states } = require('../../common/state-machine')
const { validate } = require('./validate')
const { sanitize } = require('../sanitize')

const OS_PLACES_API_PATH = '/places/v1/addresses/postcode'

const REQUEST_TIMEOUT = 5000

const standardisePostcode = (postcode) => postcode.toUpperCase().replace(/\s/g, '')

const buildGoogleAnalyticsFullUri = (gaBaseUrl, trackingId, result, ipAddress, numberOfResults, sessionId) =>
  `${gaBaseUrl}?v=1&tid=${trackingId}&t=event&cid=${sessionId}&ec=AddressLookup&ea=${result}&el=${ipAddress}&ev=${numberOfResults}`

const auditSuccessfulPostcodeLookup = (config, req, numberOfResults) => auditPostcodeLookup(config, req, 'SuccessfulLookup', numberOfResults)

const auditFailedPostcodeLookup = (config, req) => auditPostcodeLookup(config, req, 'FailedLookup', 0)

const auditPostcodeLookup = (config, req, outcome, numberOfResults) => {
  const sessionId = req.session.id
  const ipAddress = req.headers['x-forwarded-for']
  const gaBaseUrl = config.environment.GOOGLE_ANALYTICS_URI
  const gaTrackingId = config.environment.GA_TRACKING_ID
  request({
    uri: buildGoogleAnalyticsFullUri(gaBaseUrl, gaTrackingId, outcome, ipAddress, numberOfResults, sessionId),
    json: true,
    timeout: REQUEST_TIMEOUT
  }).catch(reason => logger.error('Failed to call Google Analytics to audit postcode: ', reason))
}

const behaviourForPost = (config) => async (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    return next()
  }

  const { OS_PLACES_URI, OS_PLACES_API_KEY } = config.environment
  const { postcode } = req.body
  const standardisedPostcode = standardisePostcode(postcode)

  try {
    const addressLookupResults = await request({
      uri: `${OS_PLACES_URI}${OS_PLACES_API_PATH}?postcode=${standardisedPostcode}&key=${OS_PLACES_API_KEY}`,
      json: true,
      timeout: REQUEST_TIMEOUT
    })

    req.session.postcodeLookupResults = transformOsPlacesApiResponse(addressLookupResults)
    auditSuccessfulPostcodeLookup(config, req, addressLookupResults.header.totalresults)
    return next()
  } catch (error) {
    auditFailedPostcodeLookup(config, req)
    logger.error(`Error looking up address for postcode: ${error}`)
    req.session.postcodeLookupError = true
    return next()
  }
}

const resetPostcodeLookupError = (req) => {
  if (req.session.postcodeLookupError) {
    delete req.session.postcodeLookupError
  }
}

const behaviourForGet = () => (req, res, next) => {
  resetPostcodeLookupError(req)
  stateMachine.setState(states.IN_PROGRESS, req)
  next()
}

const pageContent = ({ translate }) => ({
  title: translate('postcode.title'),
  heading: translate('postcode.heading'),
  formDescription: translate('postcode.formDescription'),
  postcodeLabel: translate('postcode.postcodeLabel'),
  buttonText: translate('buttons:continue'),
  explanation: translate('postcode.explanation')
})

const postcode = {
  path: '/postcode',
  template: 'postcode',
  pageContent,
  behaviourForPost,
  behaviourForGet,
  toggle: 'ADDRESS_LOOKUP_ENABLED',
  validate,
  sanitize
}

module.exports = {
  postcode,
  behaviourForPost,
  behaviourForGet,
  standardisePostcode,
  auditSuccessfulPostcodeLookup,
  auditFailedPostcodeLookup
}

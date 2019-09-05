const request = require('request-promise')
const { wrapError } = require('../../common/formatters')
const { transformOsPlacesApiResponse } = require('./adapters')
const { logger } = require('../../../../logger')

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
    return next(wrapError({
      cause: error,
      message: 'Error looking up address for postcode'
    }))
  }
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
  toggle: 'ADDRESS_LOOKUP_ENABLED'
}

module.exports = {
  postcode,
  behaviourForPost,
  standardisePostcode,
  auditSuccessfulPostcodeLookup,
  auditFailedPostcodeLookup
}

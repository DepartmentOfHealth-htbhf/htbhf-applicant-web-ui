const request = require('request-promise')

const { logger } = require('../../../../logger')

const REQUEST_TIMEOUT = 5000

const buildGoogleAnalyticsFullUri = (gaBaseUrl, trackingId, result, ipAddress, numberOfResults, sessionId) =>
  `${gaBaseUrl}?v=1&tid=${trackingId}&t=event&cid=${sessionId}&ec=AddressLookup&ea=${result}&el=${ipAddress}&ev=${numberOfResults}`

const auditSuccessfulPostcodeLookup = (config, req, numberOfResults) => auditPostcodeLookup(config, req, 'SuccessfulLookup', numberOfResults)

const auditFailedPostcodeLookup = (config, req) => auditPostcodeLookup(config, req, 'FailedLookup', 0)

const auditInvalidPostcodeLookup = (config, req) => auditPostcodeLookup(config, req, 'InvalidPostcode', 0)

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

// TODO DW HTBHF-2177 Move call to os places lookup into this file.

module.exports = {
  auditSuccessfulPostcodeLookup,
  auditFailedPostcodeLookup,
  auditInvalidPostcodeLookup
}

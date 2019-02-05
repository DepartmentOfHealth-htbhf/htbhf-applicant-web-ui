const { path } = require('ramda')
const { getVariableServiceCredentials } = require('./vcap-services')

const gaTrackingId = process.env.VCAP_SERVICES
  ? getVariableServiceCredentials().GA_TRACKING_ID
  : process.env.GA_TRACKING_ID || ''

module.exports = {
  USE_UNSECURE_COOKIE: path(['env', 'USE_UNSECURE_COOKIE'], process) === 'true',
  CLAIMANT_SERVICE_URL: process.env.CLAIMANT_SERVICE_URL,
  GA_TRACKING_ID: gaTrackingId
}

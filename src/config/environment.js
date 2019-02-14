const { path } = require('ramda')
const { getVariableServiceCredentials } = require('./vcap-services')

const getVCAPServicesVariable = (name, defaultValue = '') =>
  process.env.VCAP_SERVICES
    ? getVariableServiceCredentials()[name]
    : process.env[name] || defaultValue

module.exports = {
  USE_UNSECURE_COOKIE: path(['env', 'USE_UNSECURE_COOKIE'], process) === 'true',
  CLAIMANT_SERVICE_URL: process.env.CLAIMANT_SERVICE_URL,
  GA_TRACKING_ID: getVCAPServicesVariable('GA_TRACKING_ID'),
  LOG_LEVEL: getVCAPServicesVariable('UI_LOG_LEVEL', process.env.LOG_LEVEL || 'debug')
}

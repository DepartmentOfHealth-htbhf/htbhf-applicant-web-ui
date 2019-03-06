const { path } = require('ramda')
const { getVCAPServicesVariable } = require('./vcap-services')
const { toBoolean } = require('./to-boolean')

module.exports = {
  USE_UNSECURE_COOKIE: path(['env', 'USE_UNSECURE_COOKIE'], process) === 'true',
  CLAIMANT_SERVICE_URL: process.env.CLAIMANT_SERVICE_URL,
  GA_TRACKING_ID: getVCAPServicesVariable('GA_TRACKING_ID'),
  LOG_LEVEL: getVCAPServicesVariable('UI_LOG_LEVEL', process.env.LOG_LEVEL || 'debug'),
  MAINTENANCE_MODE: toBoolean(getVCAPServicesVariable('MAINTENANCE_MODE', false)),
  SERVICE_AVAILABLE_DATE: getVCAPServicesVariable('SERVICE_AVAILABLE_DATE'),
  OVERVIEW_URL: '/'
}

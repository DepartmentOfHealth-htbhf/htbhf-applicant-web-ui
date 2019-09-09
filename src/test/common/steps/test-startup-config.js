require('dotenv').config()

const { LOCAL_BASE_URL } = require('../../acceptance/config/constants')
const { INTEGRATION_BASE_URL } = require('../../integration/config')
const { SMOKE_BASE_URL } = require('../../smoke/config/environment')
const DriverManager = require('../driver/driver-manager')

const TEST_CONFIG = {
  smoke: { 'url': SMOKE_BASE_URL, 'driver': new DriverManager() },
  acceptance: { 'url': LOCAL_BASE_URL, 'driver': new DriverManager() },
  localCompatibility: { 'url': LOCAL_BASE_URL, 'driver': new DriverManager() },
  integration: { 'url': INTEGRATION_BASE_URL, 'driver': new DriverManager() }
}

module.exports.URL = TEST_CONFIG[process.env.TESTS].url
module.exports.DRIVER_MANAGER = TEST_CONFIG[process.env.TESTS].driver

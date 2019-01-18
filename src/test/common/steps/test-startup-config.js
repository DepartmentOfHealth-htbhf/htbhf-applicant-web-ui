require('dotenv').config()

const { ACCEPTANCE_BASE_URL } = require('../../acceptance/config/constants')
const { COMPATIBILITY_BASE_URL } = require('../../compatibility/config/constants')
const { SMOKE_BASE_URL } = require('../../smoke/config/environment')
const DriverManager = require('../driver/driver-manager')
const BrowserStackDriverManager = require('../../compatibility/driver/browserstack-driver')

const TEST_CONFIG = {
  'acceptance': { 'url': ACCEPTANCE_BASE_URL, 'driver': new DriverManager() },
  'compatibility': { 'url': COMPATIBILITY_BASE_URL, 'driver': new BrowserStackDriverManager() },
  'smoke': { 'url': SMOKE_BASE_URL, 'driver': new DriverManager() }
}

module.exports.URL = TEST_CONFIG[process.env.TESTS].url
module.exports.DRIVER_MANAGER = TEST_CONFIG[process.env.TESTS].driver

require('dotenv').config()

const { LOCAL_BASE_URL } = require('../../acceptance/config/constants')
const { COMPATIBILITY_BASE_URL } = require('../../compatibility/config/environment')
const { SMOKE_BASE_URL } = require('../../smoke/config/environment')
const DriverManager = require('../driver/driver-manager')
const BrowserStackDriverManager = require('../../compatibility/driver/browserstack-driver')

const TEST_CONFIG = {
  smoke: { 'url': SMOKE_BASE_URL, 'driver': new DriverManager() },
  acceptance: { 'url': LOCAL_BASE_URL, 'driver': new DriverManager() },
  localCompatibility: { 'url': LOCAL_BASE_URL, 'driver': new DriverManager() },
  compatibility: { 'url': COMPATIBILITY_BASE_URL, 'driver': new BrowserStackDriverManager() }
}

module.exports.URL = TEST_CONFIG[process.env.TESTS].url
module.exports.DRIVER_MANAGER = TEST_CONFIG[process.env.TESTS].driver

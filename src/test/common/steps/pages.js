require('dotenv').config()

const EnterName = require('../page/enter-name')
const Overview = require('../page/overview')
const Confirmation = require('../page/confirmation')
const DriverManager = require('../driver/driver-manager')
const { ACCEPTANCE_BASE_URL } = require('../../acceptance/config/constants')
const { SMOKE_BASE_URL } = require('../../smoke/config/environment')

const driverManager = new DriverManager()

const TESTS = process.env.TESTS

/**
 * Contains gloabl references to the driver and all the page objects.
 */
class Pages {
  constructor () {
    this.driver = null
    this.overview = null
    this.enterName = null
    this.confirmation = null
    this.url = (TESTS === 'acceptance' ? ACCEPTANCE_BASE_URL : SMOKE_BASE_URL)
  }

  /**
   * To be used to (re)initialise the Selenium driver manager and the driver within.
   */
  initialise () {
    this.driver = driverManager.initialise()
    this.overview = new Overview(this.driver)
    this.enterName = new EnterName(this.driver)
    this.confirmation = new Confirmation(this.driver)
  }
}

module.exports = new Pages()

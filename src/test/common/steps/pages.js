const EnterName = require('../page/enter-name')
const EnterNino = require('../page/enter-nino')
const Overview = require('../page/overview')
const Confirmation = require('../page/confirmation')
const DriverManager = require('../driver/driver-manager')
const { URL } = require('./test-startup-config')

const driverManager = new DriverManager()

/**
 * Contains gloabl references to the driver and all the page objects.
 */
class Pages {
  constructor () {
    this.driver = null
    this.overview = null
    this.enterName = null
    this.enterNino = null
    this.confirmation = null
    this.url = URL
  }

  /**
   * To be used to (re)initialise the Selenium driver manager and the driver within.
   */
  initialise () {
    this.driver = driverManager.initialise()
    this.overview = new Overview(this.driver)
    this.enterName = new EnterName(this.driver)
    this.enterNino = new EnterNino(this.driver)
    this.confirmation = new Confirmation(this.driver)
  }
}

module.exports = new Pages()

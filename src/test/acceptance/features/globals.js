const EnterName = require('../../common/page/enter-name')
const Overview = require('../../common/page/overview')
const Confirmation = require('../../common/page/confirmation')
const DriverManager = require('../../common/driver/driver-manager')

const driverManager = new DriverManager()

/**
 * Contains references to anything which needs to be accessed by all the page objects.
 */
class Globals {
  constructor () {
    this.driver = null
    this.overview = null
    this.enterName = null
    this.confirmation = null
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

module.exports = new Globals()

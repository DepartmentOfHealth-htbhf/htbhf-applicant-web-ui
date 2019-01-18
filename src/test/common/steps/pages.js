const EnterName = require('../page/enter-name')
const EnterNino = require('../page/enter-nino')
const Overview = require('../page/overview')
const Check = require('../page/check')
const { URL } = require('./test-startup-config')

/**
 * Contains global references to the driver and all the page objects.
 */
class Pages {
  constructor () {
    this.driver = null
    this.overview = null
    this.enterName = null
    this.enterNino = null
    this.check = null
    this.url = URL
  }

  /**
   * To be used to (re)initialise the Selenium driver manager and the driver within.
   */
  initialise (driverManager) {
    this.driver = driverManager.initialise()
    this.overview = new Overview(this.driver)
    this.enterName = new EnterName(this.driver)
    this.enterNino = new EnterNino(this.driver)
    this.check = new Check(this.driver)
  }
}

module.exports = new Pages()

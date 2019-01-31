const EnterName = require('../page/enter-name')
const EnterNino = require('../page/enter-nino')
const Overview = require('../page/overview')
const EnterDOB = require('../page/enter-dob')
const AreYouPregnant = require('../page/are-you-pregnant')
const CardAddress = require('../page/card-address')
const Check = require('../page/check')
const DataEntryPage = require('../page/data-entry-page')
const { URL, DRIVER_MANAGER } = require('./test-startup-config')

/**
 * Contains global references to the driver and all the page objects.
 */
class Pages {
  constructor () {
    this.driverManager = DRIVER_MANAGER
    this.driver = null
    this.overview = null
    this.enterName = null
    this.enterNino = null
    this.enterDOB = null
    this.areYouPregnant = null
    this.cardAddress = null
    this.check = null
    this.genericPage = null
    this.url = URL
  }

  /**
   * To be used to (re)initialise the Selenium driver manager and the driver within.
   */
  initialise () {
    this.driver = this.driverManager.initialise()
    this.overview = new Overview(this.driver)
    this.enterName = new EnterName(this.driver)
    this.enterNino = new EnterNino(this.driver)
    this.enterDOB = new EnterDOB(this.driver)
    this.areYouPregnant = new AreYouPregnant(this.driver)
    this.cardAddress = new CardAddress(this.driver)
    this.check = new Check(this.driver)
    this.genericPage = new DataEntryPage(this.driver)
  }
}

module.exports = new Pages()

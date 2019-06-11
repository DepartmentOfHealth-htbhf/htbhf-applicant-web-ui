const EnterName = require('../page/enter-name')
const EnterNino = require('../page/enter-nino')
const Overview = require('../page/overview')
const EnterDOB = require('../page/enter-dob')
const AreYouPregnant = require('../page/are-you-pregnant')
const CardAddress = require('../page/card-address')
const Check = require('../page/check')
const Confirm = require('../page/confirm')
const ConfirmUpdated = require('../page/confirm-updated')
const Cookies = require('../page/cookies')
const SubmittablePage = require('../page/submittable-page')
const ServerError = require('../page/server-error')
const PageNotFound = require('../page/page-not-found')
const PrivacyNotice = require('../page/privacy-notice')
const UnsuccessfulApplication = require('../page/unsuccessful-application')
const { URL, DRIVER_MANAGER } = require('./test-startup-config')

/**
 * Function used to build up the mapping of page name to function
 * to call to load the page for each Page object
 */
const addPageToMap = (accumulator, value) => ({
  ...accumulator,
  [value.getPageName()]: (baseUrl) => value.openDirect(baseUrl)
})

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
    this.confirm = null
    this.confirmUpdated = null
    this.genericPage = null
    this.cookies = null
    this.serverError = null
    this.pageNotFound = null
    this.privacyNotice = null
    this.unsuccessfulApplication = null
    this.url = URL
    this.allPages = null
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
    this.confirm = new Confirm(this.driver)
    this.confirmUpdated = new ConfirmUpdated(this.driver)
    this.cookies = new Cookies(this.driver)
    this.genericPage = new SubmittablePage(this.driver)
    this.serverError = new ServerError(this.driver)
    this.pageNotFound = new PageNotFound(this.driver)
    this.privacyNotice = new PrivacyNotice(this.driver)
    this.unsuccessfulApplication = new UnsuccessfulApplication(this.driver)
    // NOTE: This map should contain all page objects, and not the Generic Page as this doesn't itself represent a page
    this.allPages = [this.overview, this.enterName, this.enterNino, this.enterDOB, this.areYouPregnant, this.cardAddress,
      this.check, this.confirm, this.cookies, this.privacyNotice, this.confirmUpdated]
    this.pageMap = this.allPages.reduce(addPageToMap, {})
  }

  async openPageDirect (pageName) {
    await this.pageMap[pageName](this.url)
  }

  async startApplication () {
    await this.enterDOB.open(this.url)
  }
}

module.exports = new Pages()

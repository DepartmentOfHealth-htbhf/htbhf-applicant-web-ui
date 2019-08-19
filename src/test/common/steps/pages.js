const EnterName = require('../page/enter-name')
const EnterNino = require('../page/enter-nino')
const EnterDOB = require('../page/enter-dob')
const AreYouPregnant = require('../page/are-you-pregnant')
const ManualAddress = require('../page/manual-address')
const PhoneNumber = require('../page/phone-number')
const Check = require('../page/check')
const Confirm = require('../page/confirm')
const ConfirmUpdated = require('../page/confirm-updated')
const Cookies = require('../page/cookies')
const SubmittablePage = require('../page/submittable-page')
const ServerError = require('../page/server-error')
const PageNotFound = require('../page/page-not-found')
const PrivacyNotice = require('../page/privacy-notice')
const Scotland = require('../page/scotland')
const ILiveInScotland = require('../page/i-live-in-scotland')
const EmailAddress = require('../page/email-address')
const UnsuccessfulApplication = require('../page/unsuccessful-application')
const TermsAndConditions = require('../page/terms-and-conditions')
const DoYouHaveChildren = require('../page/do-you-have-children')
const SendCode = require('../page/send-code')
const EnterChildrenDOB = require('../page/enter-children-dob')
const EnterCode = require('../page/enter-code')
const Guidance = require('../page/guidance')
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
    this.enterName = null
    this.enterNino = null
    this.enterDOB = null
    this.areYouPregnant = null
    this.manualAddress = null
    this.phoneNumber = null
    this.check = null
    this.confirm = null
    this.confirmUpdated = null
    this.genericPage = null
    this.cookies = null
    this.serverError = null
    this.pageNotFound = null
    this.privacyNotice = null
    this.unsuccessfulApplication = null
    this.termsAndConditions = null
    this.scotland = null
    this.iLiveInScotland = null
    this.emailAddress = null
    this.doYouHaveChildren = null
    this.sendCode = null
    this.enterChildrenDOB = null
    this.enterCode = null
    this.url = URL
    this.allPages = null
    this.guidance = null
  }

  /**
   * To be used to (re)initialise the Selenium driver manager and the driver within.
   */
  initialise () {
    this.driver = this.driverManager.initialise()
    this.enterName = new EnterName(this.driver)
    this.enterNino = new EnterNino(this.driver)
    this.enterDOB = new EnterDOB(this.driver)
    this.areYouPregnant = new AreYouPregnant(this.driver)
    this.manualAddress = new ManualAddress(this.driver)
    this.phoneNumber = new PhoneNumber(this.driver)
    this.check = new Check(this.driver)
    this.confirm = new Confirm(this.driver)
    this.confirmUpdated = new ConfirmUpdated(this.driver)
    this.cookies = new Cookies(this.driver)
    this.genericPage = new SubmittablePage(this.driver)
    this.serverError = new ServerError(this.driver)
    this.pageNotFound = new PageNotFound(this.driver)
    this.privacyNotice = new PrivacyNotice(this.driver)
    this.scotland = new Scotland(this.driver)
    this.iLiveInScotland = new ILiveInScotland(this.driver)
    this.emailAddress = new EmailAddress(this.driver)
    this.unsuccessfulApplication = new UnsuccessfulApplication(this.driver)
    this.termsAndConditions = new TermsAndConditions(this.driver)
    this.doYouHaveChildren = new DoYouHaveChildren(this.driver)
    this.sendCode = new SendCode(this.driver)
    this.enterChildrenDOB = new EnterChildrenDOB(this.driver)
    this.enterCode = new EnterCode(this.driver)
    // NOTE: The guidance page is not added to the list of allPages as it has its own navigation methods
    this.guidance = new Guidance(this.driver)
    // NOTE: This map should contain all page objects, and not the Generic Page as this doesn't itself represent a page
    this.allPages = [this.enterName, this.enterNino, this.enterDOB, this.areYouPregnant, this.manualAddress, this.phoneNumber,
      this.check, this.confirm, this.cookies, this.privacyNotice, this.confirmUpdated, this.scotland, this.iLiveInScotland, this.emailAddress,
      this.termsAndConditions, this.doYouHaveChildren, this.sendCode, this.enterChildrenDOB, this.enterCode]
    this.pageMap = this.allPages.reduce(addPageToMap, {})
  }

  async openPageDirect (pageName) {
    await this.pageMap[pageName](this.url)
  }

  async startApplication () {
    await this.scotland.open(this.url)
  }

  async waitForFirstPage () {
    await this.scotland.waitForPageLoad()
  }
}

module.exports = new Pages()

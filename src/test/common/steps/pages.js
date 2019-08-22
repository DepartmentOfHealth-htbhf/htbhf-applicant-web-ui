const Name = require('../page/name')
const EnterNino = require('../page/enter-nino')
const DateOfBirth = require('../page/date-of-birth')
const AreYouPregnant = require('../page/are-you-pregnant')
const ManualAddress = require('../page/manual-address')
const PhoneNumber = require('../page/phone-number')
const CheckAnswers = require('../page/check-answers')
const Confirm = require('../page/confirm')
const ConfirmUpdated = require('../page/confirm-updated')
const Cookies = require('../page/cookies')
const SubmittablePage = require('../page/submittable-page')
const ServerError = require('../page/server-error')
const PageNotFound = require('../page/page-not-found')
const PrivacyNotice = require('../page/privacy-notice')
const Scotland = require('../page/scotland')
const ILiveInScotland = require('../page/in-scotland')
const EmailAddress = require('../page/email-address')
const UnsuccessfulApplication = require('../page/unsuccessful-application')
const TermsAndConditions = require('../page/terms-and-conditions')
const DoYouHaveChildren = require('../page/do-you-have-children')
const SendCode = require('../page/send-code')
const ChildDateOfBirth = require('../page/child-date-of-birth')
const EnterCode = require('../page/enter-code')
const Guidance = require('../page/guidance')
const Postcode = require('../page/postcode')
const SelectAddress = require('../page/select-address')
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
    this.name = null
    this.enterNino = null
    this.dateOfBirth = null
    this.areYouPregnant = null
    this.manualAddress = null
    this.phoneNumber = null
    this.checkAnswers = null
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
    this.childDateOfBirth = null
    this.enterCode = null
    this.url = URL
    this.allPages = null
    this.guidance = null
    this.postcode = null
    this.selectAddress = null
  }

  /**
   * To be used to (re)initialise the Selenium driver manager and the driver within.
   */
  initialise () {
    this.driver = this.driverManager.initialise()
    this.name = new Name(this.driver)
    this.enterNino = new EnterNino(this.driver)
    this.dateOfBirth = new DateOfBirth(this.driver)
    this.areYouPregnant = new AreYouPregnant(this.driver)
    this.manualAddress = new ManualAddress(this.driver)
    this.phoneNumber = new PhoneNumber(this.driver)
    this.checkAnswers = new CheckAnswers(this.driver)
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
    this.childDateOfBirth = new ChildDateOfBirth(this.driver)
    this.enterCode = new EnterCode(this.driver)
    this.postcode = new Postcode(this.driver)
    this.selectAddress = new SelectAddress(this.driver)
    // NOTE: The guidance page is not added to the list of allPages as it has its own navigation methods
    this.guidance = new Guidance(this.driver)
    // NOTE: This map should contain all page objects, and not the Generic Page as this doesn't itself represent a page
    this.allPages = [this.name, this.enterNino, this.dateOfBirth, this.areYouPregnant, this.manualAddress, this.phoneNumber,
      this.checkAnswers, this.confirm, this.cookies, this.privacyNotice, this.confirmUpdated, this.scotland, this.iLiveInScotland, this.emailAddress,
      this.termsAndConditions, this.doYouHaveChildren, this.sendCode, this.childDateOfBirth, this.enterCode, this.postcode, this.selectAddress]
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

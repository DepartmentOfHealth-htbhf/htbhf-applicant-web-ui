'use strict'

const SubmittablePage = require('./submittable-page')
const InputField = require('./input-field')

const PAGE_TITLES = {
  en: 'GOV.UK - Enter your code',
  cy: 'GOV.UK - Risus sed vulputate odio'
}

/**
 * Page object for enter code page where the confirmation code sent to the claimant is entered.
 */
class EnterCode extends SubmittablePage {
  constructor (driver) {
    super(driver)
    this.inputField = new InputField('confirmation-code', this)
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/enter-code'
  }

  getPageName () {
    return 'enter code'
  }

  getRequestNewCodeLink () {
    return this.findById('request-new-code')
  }
}

module.exports = EnterCode

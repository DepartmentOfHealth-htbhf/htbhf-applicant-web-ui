'use strict'

const SubmittablePage = require('./submittable-page')
const InputField = require('./input-field')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your email address?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for Email address page where the email address is entered.
 */
class EmailAddress extends SubmittablePage {
  constructor (driver) {
    super(driver)
    this.inputField = new InputField('email-address', this)
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/email-address'
  }

  getPageName () {
    return 'email address'
  }
}

module.exports = EmailAddress

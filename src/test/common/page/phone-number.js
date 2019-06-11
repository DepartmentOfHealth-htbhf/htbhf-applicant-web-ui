'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What\'s your mobile telephone number?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for PhoneNumber page where the phone number is entered.
 */
class PhoneNumber extends SubmittablePage {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/phone-number'
  }

  getPageName () {
    return 'phone number'
  }
}

module.exports = PhoneNumber

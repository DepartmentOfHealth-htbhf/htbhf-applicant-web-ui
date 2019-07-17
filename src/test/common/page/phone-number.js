'use strict'

const SubmittablePage = require('./submittable-page')
const InputField = require('./input-field')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your mobile telephone number?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for PhoneNumber page where the phone number is entered.
 */
class PhoneNumber extends SubmittablePage {
  constructor (driver) {
    super(driver)
    this.inputField = new InputField('phone-number', this)
  }
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

'use strict'

const SubmittablePage = require('./submittable-page')
const InputField = require('./input-field')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your address?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for Address page where the address is entered manually.
 */
class Postcode extends SubmittablePage {
  constructor (driver) {
    super(driver)
    this.postcodeInputField = new InputField('postcode', this)
  }
  getPath () {
    return '/postcode'
  }

  getPageName () {
    return 'postcode'
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }
}

module.exports = Postcode

'use strict'

const SubmittablePage = require('./submittable-page')
const InputField = require('./input-field')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your address?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for Address page where the address is entered.
 */
class Address extends SubmittablePage {
  constructor (driver) {
    super(driver)
    this.line1InputField = new InputField('address-line-1', this)
    this.line2InputField = new InputField('address-line-2', this)
    this.townOrCityInputField = new InputField('town-or-city', this)
    this.postcodeInputField = new InputField('postcode', this)
  }
  getPath () {
    return '/address'
  }

  getPageName () {
    return 'address'
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }
}

module.exports = Address

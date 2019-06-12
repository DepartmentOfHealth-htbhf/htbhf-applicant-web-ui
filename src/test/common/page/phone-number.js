'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What\'s your mobile telephone number?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

const PHONE_NUMBER_FIELD_ERROR_ID = 'phone-number-error'
const PHONE_NUMBER_ERROR_LINK_CSS = 'a[href="#phone-number-error"]'

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

  async enterPhoneNumber (phoneNumber) {
    const phoneNumberField = await this.getPhoneNumberField()
    await phoneNumberField.sendKeys(phoneNumber)
  }

  async getPhoneNumberValue () {
    const phoneNumberField = await this.getPhoneNumberField()
    return phoneNumberField.getAttribute('value')
  }

  async getPhoneNumberField () {
    return this.findById('phone-number')
  }

  async getPhoneNumberFieldErrorText () {
    const fieldError = await this.findById(PHONE_NUMBER_FIELD_ERROR_ID)
    return this.getVisibleTextFromFieldError(fieldError)
  }

  async getPhoneNumberLinkErrorText () {
    const errorLink = await this.findByCSS(PHONE_NUMBER_ERROR_LINK_CSS)
    return errorLink.getText()
  }
}

module.exports = PhoneNumber

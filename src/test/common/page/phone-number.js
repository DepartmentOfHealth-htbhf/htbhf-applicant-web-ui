'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your mobile telephone number?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

const PHONE_NUMBER_FIELD_ERROR_ID = 'phone-number-error'
const PHONE_NUMBER_ERROR_LINK_CSS = 'a[href="#phone-number-error"]'
const PHONE_NUMBER_INPUT_ID = 'phone-number'

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

  // TODO MS: HTBHF-1836 Refactor this and clearPhoneNumber into InputField Class
  async getPhoneNumberField () {
    return this.findById('phone-number')
  }

  async clearPhoneNumber () {
    const phoneNumberField = await this.getPhoneNumberField()
    await phoneNumberField.clear()
  }

  async enterPhoneNumber (phoneNumber) {
    await this.enterValueForInputWithId(PHONE_NUMBER_INPUT_ID, phoneNumber)
  }

  async getPhoneNumberValue () {
    return this.getValueForInputWithId(PHONE_NUMBER_INPUT_ID)
  }

  getPhoneNumberFieldErrorId () {
    return PHONE_NUMBER_FIELD_ERROR_ID
  }

  getPhoneNumberLinkErrorCss () {
    return PHONE_NUMBER_ERROR_LINK_CSS
  }
}

module.exports = PhoneNumber

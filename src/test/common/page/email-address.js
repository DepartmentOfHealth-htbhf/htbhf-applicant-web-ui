'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your email address?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

const EMAIL_ADDRESS_FIELD_ERROR_ID = 'email-address-error'
const EMAIL_ADDRESS_ERROR_LINK_CSS = 'a[href="#email-address-error"]'

/**
 * Page object for Email address page where the email address is entered.
 */
class EmailAddress extends SubmittablePage {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/email-address'
  }

  getPageName () {
    return 'email address'
  }

  async enterEmailAddress (emailAddress) {
    const emailAddressField = await this.getEmailAddressField()
    await emailAddressField.sendKeys(emailAddress)
  }

  async getEmailAddressField () {
    return this.findById('email-address')
  }

  async getEmailAddressValue () {
    const emailAddress = await this.getEmailAddressField()
    return emailAddress.getAttribute('value')
  }

  getEmailAddressFieldErrorId () {
    return EMAIL_ADDRESS_FIELD_ERROR_ID
  }

  getEmailAddressLinkErrorCss () {
    return EMAIL_ADDRESS_ERROR_LINK_CSS
  }
}

module.exports = EmailAddress

'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What\'s your email address?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

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
}

module.exports = EmailAddress

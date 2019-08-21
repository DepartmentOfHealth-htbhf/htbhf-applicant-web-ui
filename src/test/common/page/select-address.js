'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your address?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for select address page where the address is selected from address lookup.
 */
class SelectAddress extends SubmittablePage {
  getPath () {
    return '/select-address'
  }

  getPageName () {
    return 'select address'
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }
}

module.exports = SelectAddress

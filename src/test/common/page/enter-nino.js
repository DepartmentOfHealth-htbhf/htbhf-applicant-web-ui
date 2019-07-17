'use strict'

const SubmittablePage = require('./submittable-page')
const InputField = require('./input-field')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your National Insurance number?',
  cy: 'GOV.UK - Excepteur sint occaecat cupidatat non proident?'
}

/**
 * Page object for EnterNino page where the national insurance number is entered.
 */
class EnterNino extends SubmittablePage {
  constructor (driver) {
    super(driver)
    this.inputField = new InputField('nino', this)
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/enter-nino'
  }

  getPageName () {
    return 'enter national insurance'
  }
}

module.exports = EnterNino

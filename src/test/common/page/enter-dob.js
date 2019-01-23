'use strict'

const Page = require('./page')

const PAGE_TITLES = {
  en: 'GOV.UK - What is your date of birth?',
  cy: 'GOV.UK - Tempus egestas sed sed risus pretium?'
}

const PAGE_HEADINGS = {
  en: 'What is your date of birth?',
  cy: 'Tempus egestas sed sed risus pretium?'
}

/**
 * Page object for EnterDOB page where the name is entered.
 */
class EnterDOB extends Page {
  async open (baseURL) {
    await super.open(`${baseURL}/enter-dob`)
    return this.waitForPageLoad()
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageLoad(PAGE_HEADINGS[lang], PAGE_TITLES[lang])
  }
}

module.exports = EnterDOB

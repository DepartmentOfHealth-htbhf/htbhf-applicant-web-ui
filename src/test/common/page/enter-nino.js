'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your National Insurance number?',
  cy: 'GOV.UK - Excepteur sint occaecat cupidatat non proident?'
}

const NINO_FIELD_ERROR_ID = 'nino-error'
const NINO_ERROR_LINK_CSS = 'a[href="#nino-error"]'
const NINO_INPUT_ID = 'nino'

/**
 * Page object for EnterNino page where the national insurance number is entered.
 */
class EnterNino extends SubmittablePage {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/enter-nino'
  }

  getPageName () {
    return 'enter national insurance'
  }

  async enterNino (nino) {
    await this.enterValueForInputWithId(NINO_INPUT_ID, nino)
  }

  async getNinoValue () {
    return this.getValueForInputWithId(NINO_INPUT_ID)
  }

  getNinoFieldErrorId () {
    return NINO_FIELD_ERROR_ID
  }

  getNinoLinkErrorCss () {
    return NINO_ERROR_LINK_CSS
  }
}

module.exports = EnterNino

'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What is your National Insurance number?',
  cy: 'GOV.UK - Excepteur sint occaecat cupidatat non proident?'
}

const PAGE_HEADINGS = {
  en: 'What is your National Insurance number?',
  cy: 'Excepteur sint occaecat cupidatat non proident?'
}

const NINO_FIELD_ERROR_ID = 'nino-error'
const NINO_ERROR_LINK_CSS = 'a[href="#nino-error"]'

/**
 * Page object for EnterNino page where the name is entered.
 */
class EnterNino extends SubmittablePage {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageLoad(PAGE_HEADINGS[lang], PAGE_TITLES[lang])
  }

  getPath () {
    return '/enter-nino'
  }

  getPageName () {
    return 'enter national insurance'
  }

  async enterNino (nino) {
    const ninoField = await this.getNinoField()
    await ninoField.sendKeys(nino)
  }

  async getNinoField () {
    return this.findById('nino')
  }

  async getNinoValue () {
    const nino = await this.getNinoField()
    return nino.getAttribute('value')
  }

  async getNinoFieldErrorText () {
    const fieldError = await this.findById(NINO_FIELD_ERROR_ID)
    return fieldError.getText()
  }

  async getNinoLinkErrorText () {
    const errorLink = await this.findByCSS(NINO_ERROR_LINK_CSS)
    return errorLink.getText()
  }
}

module.exports = EnterNino

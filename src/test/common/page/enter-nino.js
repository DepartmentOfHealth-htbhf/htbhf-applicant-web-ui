'use strict'

const DataEntryPage = require('./data-entry-page')

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
class EnterNino extends DataEntryPage {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageLoad(PAGE_HEADINGS[lang], PAGE_TITLES[lang])
  }

  async open (baseURL, lang) {
    await super.open(`${baseURL}/enter-nino`, lang)
    return this.waitForPageLoad(lang)
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

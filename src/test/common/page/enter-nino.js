'use strict'

const Page = require('./page')

const PAGE_TITLES = {
  en: 'GOV.UK - What is your National Insurance number?',
  cy: 'GOV.UK - Excepteur sint occaecat cupidatat non proident?'
}

const PAGE_HEADINGS = {
  en: 'What is your National Insurance number?',
  cy: 'Excepteur sint occaecat cupidatat non proident?'
}

const NINO_ERROR_ID = 'nino-error'

/**
 * Page object for EnterNino page where the name is entered.
 */
class EnterNino extends Page {
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

  async submitForm () {
    const submitButton = await this.getSubmitButton()
    await submitButton.click()
  }

  async getSubmitButton () {
    return this.findByClassName('govuk-button')
  }

  async getNinoError () {
    const ninoError = await this.findById(NINO_ERROR_ID)
    return ninoError.getText()
  }
}

module.exports = EnterNino

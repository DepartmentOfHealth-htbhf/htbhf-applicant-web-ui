'use strict'

const Page = require('./page')
const { expect } = require('chai')

const PAGE_TITLE = 'GOV.UK - What is your National Insurance number?'
const NINO_ERROR_ID = 'nino-error'

/**
 * Page object for EnterNino page where the name is entered.
 */
class EnterNino extends Page {
  async waitForPageLoad () {
    const h1Text = await this.getH1Text()
    expect(h1Text).to.be.equal('What is your National Insurance number?')
    return this.waitForPageWithTitle(PAGE_TITLE)
  }

  async open (baseURL) {
    await super.open(`${baseURL}/enter-nino`)
    return this.waitForPageLoad()
  }

  async enterNino (nino) {
    const ninoField = await this.getNinoField()
    ninoField.sendKeys(nino)
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

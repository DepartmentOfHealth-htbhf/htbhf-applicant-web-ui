'use strict'

const Page = require('./page')
const { expect } = require('chai')

const PAGE_TITLE = 'GOV.UK - The best place to find government services and information'
const FIRST_NAME_ERROR_SELECTOR = 'span#first-name-error'
const LAST_NAME_ERROR_SELECTOR = 'span#last-name-error'

/**
 * Page object for EnterName page where the name is entered.
 * This will change greatly when the Name page is revisited for HTBHFB-7.
 */
class EnterName extends Page {
  async getFirstNameField () {
    return this.findById('first-name')
  }

  async getLastNameField () {
    return this.findById('last-name')
  }

  async getSubmitButton () {
    return this.findByClassName('govuk-button')
  }

  async enterFirstName (name) {
    const nameField = await this.getFirstNameField()
    return nameField.sendKeys(name)
  }

  async enterLastName (name) {
    const nameField = await this.getLastNameField()
    return nameField.sendKeys(name)
  }

  async submitForm () {
    const submitButton = await this.getSubmitButton()
    await submitButton.click()
  }

  async isConfirmationDisplayed () {
    const confirm = await this.findByCSS('[value="Confirm submission"]')
    return confirm.isDisplayed()
  }

  async open (baseURL) {
    await super.open(`${baseURL}/enter-name`)
    return this.waitForPageLoad()
  }

  async waitForPageLoad () {
    const h1Text = await this.getH1Text()
    expect(h1Text).to.be.equal('What is your name?')
    return this.waitForPageWithTitle(PAGE_TITLE)
  }

  async getFirstNameError () {
    await this.waitForElement({ selector: FIRST_NAME_ERROR_SELECTOR })
    const firstNameError = await this.findByCSS(FIRST_NAME_ERROR_SELECTOR)
    return firstNameError.getText()
  }

  async getLastNameError () {
    await this.waitForElement({ selector: LAST_NAME_ERROR_SELECTOR })
    const firstNameError = await this.findByCSS(LAST_NAME_ERROR_SELECTOR)
    return firstNameError.getText()
  }
}

module.exports = EnterName

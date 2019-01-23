'use strict'

const Page = require('./page')

const PAGE_TITLES = {
  en: 'GOV.UK - What is your name?',
  cy: 'GOV.UK - Vulputate dignissim suspendisse?'
}

const PAGE_HEADINGS = {
  en: 'What is your name?',
  cy: 'Vulputate dignissim suspendisse?'
}

const FIRST_NAME_ERROR_SELECTOR = 'span#first-name-error'
const LAST_NAME_ERROR_SELECTOR = 'span#last-name-error'

/**
 * Page object for EnterName page where the name is entered.
 */
class EnterName extends Page {
  async getFirstNameField () {
    return this.findById('first-name')
  }

  async getFirstNameValue () {
    const firstNameField = await this.getFirstNameField()
    return firstNameField.getAttribute('value')
  }

  async getLastNameField () {
    return this.findById('last-name')
  }

  async getLastNameValue () {
    const lastNameField = await this.getLastNameField()
    return lastNameField.getAttribute('value')
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

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageLoad(PAGE_HEADINGS[lang], PAGE_TITLES[lang])
  }

  async getFirstNameError () {
    const firstNameError = await this.findByCSS(FIRST_NAME_ERROR_SELECTOR)
    return firstNameError.getText()
  }

  async getLastNameError () {
    const firstNameError = await this.findByCSS(LAST_NAME_ERROR_SELECTOR)
    return firstNameError.getText()
  }
}

module.exports = EnterName

'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What is your name?',
  cy: 'GOV.UK - Vulputate dignissim suspendisse?'
}

const PAGE_HEADINGS = {
  en: 'What is your name?',
  cy: 'Vulputate dignissim suspendisse?'
}

const FIRST_NAME_ERROR_SELECTOR = 'span#first-name-error'
const FIRST_NAME_ERROR_LINK_CSS = 'a[href="#first-name-error"]'
const LAST_NAME_ERROR_SELECTOR = 'span#last-name-error'
const LAST_NAME_ERROR_LINK_CSS = 'a[href="#last-name-error"]'

/**
 * Page object for EnterName page where the name is entered.
 */
class EnterName extends SubmittablePage {
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

  async enterFirstName (name) {
    const nameField = await this.getFirstNameField()
    return nameField.sendKeys(name)
  }

  async enterLastName (name) {
    const nameField = await this.getLastNameField()
    return nameField.sendKeys(name)
  }

  getPath () {
    return '/enter-name'
  }

  getPageName () {
    return 'enter name'
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageLoad(PAGE_HEADINGS[lang], PAGE_TITLES[lang])
  }

  async getFirstNameErrorFieldText () {
    const fieldError = await this.findByCSS(FIRST_NAME_ERROR_SELECTOR)
    return fieldError.getText()
  }

  async getFirstNameErrorLinkText () {
    const errorLink = await this.findByCSS(FIRST_NAME_ERROR_LINK_CSS)
    return errorLink.getText()
  }

  async getLastNameErrorFieldText () {
    const fieldError = await this.findByCSS(LAST_NAME_ERROR_SELECTOR)
    return fieldError.getText()
  }

  async getLastNameErrorLinkText () {
    const errorLink = await this.findByCSS(LAST_NAME_ERROR_LINK_CSS)
    return errorLink.getText()
  }
}

module.exports = EnterName

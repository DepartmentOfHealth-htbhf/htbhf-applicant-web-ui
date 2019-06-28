'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your name?',
  cy: 'GOV.UK - Vulputate dignissim suspendisse?'
}

const FIRST_NAME_ERROR_ID = 'first-name-error'
const FIRST_NAME_ERROR_LINK_CSS = 'a[href="#first-name-error"]'
const LAST_NAME_ERROR_ID = 'last-name-error'
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
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getFirstNameErrorFieldId () {
    return FIRST_NAME_ERROR_ID
  }

  getFirstNameErrorLinkCss () {
    return FIRST_NAME_ERROR_LINK_CSS
  }

  getLastNameErrorFieldId () {
    return LAST_NAME_ERROR_ID
  }

  getLastNameErrorLinkCss () {
    return LAST_NAME_ERROR_LINK_CSS
  }
}

module.exports = EnterName

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
const FIRST_NAME_INPUT_ID = 'first-name'
const LAST_NAME_INPUT_ID = 'last-name'

/**
 * Page object for EnterName page where the name is entered.
 */
class EnterName extends SubmittablePage {
  async getFirstNameValue () {
    return this.getValueForInputWithId(FIRST_NAME_INPUT_ID)
  }

  async getLastNameValue () {
    return this.getValueForInputWithId(LAST_NAME_INPUT_ID)
  }

  async enterFirstName (name) {
    return this.enterValueForInputWithId(FIRST_NAME_INPUT_ID, name)
  }

  async enterLastName (name) {
    return this.enterValueForInputWithId(LAST_NAME_INPUT_ID, name)
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

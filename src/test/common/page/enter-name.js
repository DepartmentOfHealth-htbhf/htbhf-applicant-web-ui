'use strict'

const SubmittablePage = require('./submittable-page')
const InputField = require('./input-field')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your name?',
  cy: 'GOV.UK - Vulputate dignissim suspendisse?'
}

/**
 * Page object for EnterName page where the name is entered.
 */
class EnterName extends SubmittablePage {
  constructor (driver) {
    super(driver)
    this.firstNameInputField = new InputField('first-name', this)
    this.lastNameInputField = new InputField('last-name', this)
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
}

module.exports = EnterName

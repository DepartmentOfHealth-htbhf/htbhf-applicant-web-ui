'use strict'

const SubmittablePage = require('./submittable-page')
const InputField = require('./input-field')

const PAGE_TITLES = {
  en: 'GOV.UK - What’s your date of birth?',
  cy: 'GOV.UK - Tempus egestas sed sed risus pretium?'
}

const DATE_OF_BIRTH_ERROR_LINK_CSS = 'a[href="#date-of-birth-error"]'
const DATE_OF_BIRTH_FIELD_ERROR_ID = 'date-of-birth-error'

/**
 * Page object for the 'enter date of birth' page.
 */
class EnterDOB extends SubmittablePage {
  constructor (driver) {
    super(driver)
    this.dayInputField = new InputField('dateOfBirth-day', this)
    this.monthInputField = new InputField('dateOfBirth-month', this)
    this.yearInputField = new InputField('dateOfBirth-year', this)
  }
  getPath () {
    return '/enter-dob'
  }

  getPageName () {
    return 'enter date of birth'
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getDateOfBirthFieldErrorId () {
    return DATE_OF_BIRTH_FIELD_ERROR_ID
  }

  getDateOfBirthErrorLinkCss () {
    return DATE_OF_BIRTH_ERROR_LINK_CSS
  }
}

module.exports = EnterDOB

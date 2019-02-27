'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What is your date of birth?',
  cy: 'GOV.UK - Tempus egestas sed sed risus pretium?'
}

const DATE_OF_BIRTH_ERROR_LINK_CSS = 'a[href="#date-of-birth-error"]'
const DATE_OF_BIRTH_FIELD_ERROR_ID = 'date-of-birth-error'

/**
 * Page object for EnterDOB page where the name is entered.
 */
class EnterDOB extends SubmittablePage {
  getPath () {
    return '/enter-dob'
  }

  getPageName () {
    return 'enter date of birth'
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  async getDayField () {
    return this.findById('day')
  }

  async getMonthField () {
    return this.findById('month')
  }

  async getYearField () {
    return this.findById('year')
  }

  async enterDay (day) {
    const dayField = await this.getDayField()
    return dayField.sendKeys(day)
  }

  async enterMonth (month) {
    const monthField = await this.getMonthField()
    return monthField.sendKeys(month)
  }

  async enterYear (year) {
    const yearField = await this.getYearField()
    return yearField.sendKeys(year)
  }

  async getDateOfBirthFieldErrorText () {
    const fieldError = await this.findById(DATE_OF_BIRTH_FIELD_ERROR_ID)
    return fieldError.getText()
  }

  async getDateOfBirthErrorLinkText () {
    const errorLink = await this.findByCSS(DATE_OF_BIRTH_ERROR_LINK_CSS)
    return errorLink.getText()
  }
}

module.exports = EnterDOB

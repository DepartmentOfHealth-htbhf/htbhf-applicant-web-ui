'use strict'

const Page = require('./page')

const PAGE_TITLES = {
  en: 'GOV.UK - What is your date of birth?',
  cy: 'GOV.UK - Tempus egestas sed sed risus pretium?'
}

const PAGE_HEADINGS = {
  en: 'What is your date of birth?',
  cy: 'Tempus egestas sed sed risus pretium?'
}

const DATE_OF_BIRTH_ERROR_SELECTOR = 'a[href="#date-of-birth-error"]'

/**
 * Page object for EnterDOB page where the name is entered.
 */
class EnterDOB extends Page {
  async open (baseURL) {
    await super.open(`${baseURL}/enter-dob`)
    return this.waitForPageLoad()
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageLoad(PAGE_HEADINGS[lang], PAGE_TITLES[lang])
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

  async getSubmitButton () {
    return this.findByClassName('govuk-button')
  }

  async submitForm () {
    const submitButton = await this.getSubmitButton()
    await submitButton.click()
  }

  async getDateOfBirthError () {
    const errorLink = await this.findByCSS(DATE_OF_BIRTH_ERROR_SELECTOR)
    return errorLink.getText()
  }
}

module.exports = EnterDOB

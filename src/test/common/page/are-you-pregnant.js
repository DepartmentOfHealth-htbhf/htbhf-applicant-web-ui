'use strict'
const webdriver = require('selenium-webdriver')

const SubmittablePageWithRadioButtons = require('./submittable-page-with-radio-buttons')

const PAGE_TITLES = {
  en: 'GOV.UK - Are you pregnant?',
  cy: 'GOV.UK - Eget felis eget nunc lobortis mattis?'
}

const ARE_YOU_PREGNANT_ERROR_LINK_CSS = 'a[href="#are-you-pregnant-error"]'
const ARE_YOU_PREGNANT_FIELD_ERROR_ID = 'areYouPregnant-error'
const EXPECTED_DELIVERY_DATE_ERROR_LINK_CSS = 'a[href="#expected-delivery-date-error"]'
const EXPECTED_DELIVERY_DATE_FIELD_ERROR_ID = 'expected-delivery-date-error'

/**
 * Page object for the Are you pregnant? page.
 */
class AreYouPregnant extends SubmittablePageWithRadioButtons {
  getPath () {
    return '/are-you-pregnant'
  }

  getPageName () {
    return 'are you pregnant'
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  async setExpectedDeliveryDate (day = 0, month = 0, year = 0) {
    await this.setExpectedDeliveryDateDay(day)
    await this.setExpectedDeliveryDateMonth(month)
    await this.setExpectedDeliveryDateYear(year)
  }

  async enterExpectedDeliveryDate ({ incrementMonth = 0 } = {}) {
    const date = new Date()
    date.setMonth(date.getMonth() + incrementMonth)
    await this.setExpectedDeliveryDate(date.getDate(), date.getMonth() + 1, date.getFullYear())
  }

  async enterValidExpectedDeliveryDate () {
    await this.enterExpectedDeliveryDate({ incrementMonth: 6 })
  }

  async enterTextInDeliveryDateFields () {
    await this.setExpectedDeliveryDate('foo', 'bar', 'baz!')
  }

  async enterExpectedDeliveryDateTooFarInThePast () {
    await this.enterExpectedDeliveryDate({ incrementMonth: -2 })
  }

  async enterExpectedDeliveryDateTooFarInTheFuture () {
    await this.enterExpectedDeliveryDate({ incrementMonth: 9 })
  }

  async getExpectedDeliveryDateDayInput () {
    return this.findByCSS(`input[name="expectedDeliveryDate-day"]`)
  }

  async setExpectedDeliveryDateDay (day) {
    const dayField = await this.getExpectedDeliveryDateDayInput()
    return dayField.sendKeys(day)
  }

  async getExpectedDeliveryDateMonthInput () {
    return this.findByCSS(`input[name="expectedDeliveryDate-month"]`)
  }

  async setExpectedDeliveryDateMonth (month) {
    const monthField = await this.getExpectedDeliveryDateMonthInput()
    return monthField.sendKeys(month)
  }

  async getExpectedDeliveryDateYearInput () {
    return this.findByCSS(`input[name="expectedDeliveryDate-year"]`)
  }

  async setExpectedDeliveryDateYear (year) {
    const yearField = await this.getExpectedDeliveryDateYearInput()
    return yearField.sendKeys(year)
  }

  getAreYouPregnantFieldErrorId () {
    return ARE_YOU_PREGNANT_FIELD_ERROR_ID
  }

  getAreYouPregnantErrorLinkCss () {
    return ARE_YOU_PREGNANT_ERROR_LINK_CSS
  }

  getExpectedDeliveryDateFieldErrorId () {
    return EXPECTED_DELIVERY_DATE_FIELD_ERROR_ID
  }

  getExpectedDeliveryDateErrorLinkCss () {
    return EXPECTED_DELIVERY_DATE_ERROR_LINK_CSS
  }

  async getExpectedDeliveryDateInstructionalText () {
    return this.driver.findElement(webdriver.By.id('expected-delivery-date-hint'))
  }
}

module.exports = AreYouPregnant

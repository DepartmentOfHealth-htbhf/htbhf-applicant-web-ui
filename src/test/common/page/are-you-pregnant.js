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
const EXPECTED_DELIVERY_DATE_DAY_INPUT_ID = 'expectedDeliveryDate-day'
const EXPECTED_DELIVERY_DATE_MONTH_INPUT_ID = 'expectedDeliveryDate-month'
const EXPECTED_DELIVERY_DATE_YEAR_INPUT_ID = 'expectedDeliveryDate-year'

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
    await this.enterExpectedDeliveryDateDay(day)
    await this.enterExpectedDeliveryDateMonth(month)
    await this.enterExpectedDeliveryDateYear(year)
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

  async getExpectedDeliveryDateDay () {
    return this.getValueForInputWithId(EXPECTED_DELIVERY_DATE_DAY_INPUT_ID)
  }

  async enterExpectedDeliveryDateDay (day) {
    await this.enterValueForInputWithId(EXPECTED_DELIVERY_DATE_DAY_INPUT_ID, day)
  }

  async getExpectedDeliveryDateMonth () {
    return this.getValueForInputWithId(EXPECTED_DELIVERY_DATE_MONTH_INPUT_ID)
  }

  async enterExpectedDeliveryDateMonth (day) {
    await this.enterValueForInputWithId(EXPECTED_DELIVERY_DATE_MONTH_INPUT_ID, day)
  }

  async getExpectedDeliveryDateYear () {
    return this.getValueForInputWithId(EXPECTED_DELIVERY_DATE_YEAR_INPUT_ID)
  }

  async enterExpectedDeliveryDateYear (day) {
    await this.enterValueForInputWithId(EXPECTED_DELIVERY_DATE_YEAR_INPUT_ID, day)
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

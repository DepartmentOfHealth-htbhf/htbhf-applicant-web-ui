'use strict'
const webdriver = require('selenium-webdriver')

const DataEntryPage = require('./data-entry-page')
const PAGE_TITLE = 'GOV.UK - Are you pregnant?'

/**
 * Page object for the Are you pregnant? page.
 */
class AreYouPregnant extends DataEntryPage {
  async open (baseURL) {
    await super.open(`${baseURL}/are-you-pregnant`)
    return this.waitForPageLoad()
  }

  async waitForPageLoad () {
    return this.waitForPageWithTitle(PAGE_TITLE)
  }

  async selectRadioButton (option) {
    const radioButton = await this.getRadioButton(option)
    const div = await radioButton.findElement(webdriver.By.xpath('..'))
    const label = await div.findElement(webdriver.By.className('govuk-radios__label'))
    await label.click()
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

  async getRadioButton (option) {
    return this.findByCSS(`input[value="${option}"]`)
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

  async getRadioButtons () {
    return this.driver.findElements(webdriver.By.className('govuk-radios__item'))
  }

  async getAreYouPregnantErrorText () {
    const error = await this.findById('areYouPregnant-error')
    return error.getText()
  }

  async getExpectedDeliveryDateErrorText () {
    const error = await this.findById('expected-delivery-date-error')
    return error.getText()
  }

  async getRadioLabelWithText (option) {
    const radioButtonLabels = await this.driver.findElements(webdriver.By.className('govuk-label govuk-radios__label'))
    radioButtonLabels.forEach(function (label) {
      if (label.getText() === option) {
        return label
      }
    })
  }

  async getExpectedDeliveryDateInstructionalText () {
    return this.driver.findElement(webdriver.By.id('expected-delivery-date-hint'))
  }
}

module.exports = AreYouPregnant

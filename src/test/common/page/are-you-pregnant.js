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

  async getRadioButton (option) {
    return this.findByCSS(`input[value="${option}"]`)
  }

  async getRadioButtons () {
    return this.driver.findElements(webdriver.By.className('govuk-radios__item'))
  }

  async getAreYouPregnantErrorText () {
    const error = await this.findById('areYouPregnant-error')
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
}

module.exports = AreYouPregnant

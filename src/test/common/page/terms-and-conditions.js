'use strict'

const webdriver = require('selenium-webdriver')
const SubmittablePage = require('./submittable-page')
const TERMS_AND_CONDITIONS_TITLE = 'GOV.UK - Read and agree to our terms and conditions'

/**
 * Page object for the page where the customer can check their details before submitting.
 */
class TermsAndConditions extends SubmittablePage {
  getPath () {
    return '/terms-and-conditions'
  }

  getPageName () {
    return 'terms and conditions'
  }

  async waitForPageLoad () {
    return super.waitForPageWithTitle(TERMS_AND_CONDITIONS_TITLE)
  }

  async selectCheckbox () {
    const checkbox = await this.getCheckbox()
    const div = await checkbox.findElement(webdriver.By.xpath('..'))
    const label = await div.findElement(webdriver.By.className('govuk-checkboxes__label'))
    await label.click()
  }

  async getCheckbox () {
    return this.findByCSS(`input[value="agree"]`)
  }
}

module.exports = TermsAndConditions

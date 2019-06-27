'use strict'

const webdriver = require('selenium-webdriver')
const SubmittablePage = require('./submittable-page')
const TERMS_AND_CONDITIONS_TITLE = 'GOV.UK - Terms and conditions'
const FIELD_ERROR_ID = 'agree-error'
const ERROR_LINK_CSS = 'a[href="#agree-error"]'

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
    try {
      const checkbox = await this.getCheckbox()
      const div = await checkbox.findElement(webdriver.By.xpath('..'))
      const label = await div.findElement(webdriver.By.className('govuk-checkboxes__label'))
      await label.click()
    } catch (error) {
      console.log(`Error selecting checkbox: ${error}`)
      throw new Error(error)
    }
  }

  async getCheckbox () {
    return this.findByCSS(`input[value="agree"]`)
  }

  getFieldErrorId () {
    return FIELD_ERROR_ID
  }

  getErrorLinkCss () {
    return ERROR_LINK_CSS
  }
}

module.exports = TermsAndConditions

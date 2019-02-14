'use strict'

const SubmittablePage = require('./submittable-page')
const CONFIRM_PAGE_TITLE = 'GOV.UK - Application complete'

/**
 * Page object for the confirmation page after submitting the claim.
 */
class Confirm extends SubmittablePage {
  async open (appURL) {
    await super.open(appURL)
    return this.waitForPageLoad()
  }

  async waitForPageLoad () {
    return this.waitForPageWithTitle(CONFIRM_PAGE_TITLE)
  }
}

module.exports = Confirm

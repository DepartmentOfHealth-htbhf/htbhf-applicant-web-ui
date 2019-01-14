'use strict'

const Page = require('./page')
const OVERVIEW_PAGE_TITLE = 'GOV.UK - Confirm'

/**
 * Page object for the confirmation page before submit.
 */
class Confirmation extends Page {
  async open (appURL) {
    await super.open(appURL)
    return this.waitForPageLoad()
  }

  async waitForPageLoad () {
    return this.waitForPageWithTitle(OVERVIEW_PAGE_TITLE)
  }
}

module.exports = Confirmation

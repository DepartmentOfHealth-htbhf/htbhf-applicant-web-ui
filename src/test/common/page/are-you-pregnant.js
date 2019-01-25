'use strict'

const Page = require('./page')
const OVERVIEW_PAGE_TITLE = 'GOV.UK - Are you pregnant?'

/**
 * Page object for the Are you pregnant? page.
 */
class AreYouPregnant extends Page {
  async open (appURL) {
    await super.open(appURL)
    return this.waitForPageLoad()
  }

  async waitForPageLoad () {
    return this.waitForPageWithTitle(OVERVIEW_PAGE_TITLE)
  }
}

module.exports = AreYouPregnant

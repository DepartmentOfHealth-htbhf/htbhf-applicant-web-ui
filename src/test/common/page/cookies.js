'use strict'

const Page = require('./page')
const COOKIES_PAGE_TITLE = 'GOV.UK - Cookies'

/**
 * Page object for the cookies page which is linked in the footer.
 */
class Cookies extends Page {
  async open (appURL) {
    await super.open(appURL)
    return this.waitForPageLoad()
  }

  async waitForPageLoad () {
    return this.waitForPageWithTitle(COOKIES_PAGE_TITLE)
  }
}

module.exports = Cookies

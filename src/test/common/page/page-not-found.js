'use strict'

const Page = require('./page')
const PAGE_NOT_FOUND_TITLE = 'GOV.UK - Page not found'

/**
 * Page object for the not found page for when a user goes to a non existent url.
 */
class PageNotFound extends Page {
  getPath () {
    return '/invalid'
  }

  getPageName () {
    return 'Page not found'
  }

  async waitForPageLoad () {
    return super.waitForPageWithTitle(PAGE_NOT_FOUND_TITLE)
  }
}

module.exports = PageNotFound

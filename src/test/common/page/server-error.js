'use strict'

const Page = require('./page')
const SERVER_ERROR_PAGE_TITLE = 'GOV.UK - Sorry, there’s a problem with the service'

/**
 * Page object for the server error page, shown when an error occurs in the application.
 */
class ServerError extends Page {
  getPageName () {
    return 'Server Error'
  }

  async waitForPageLoad () {
    return super.waitForPageWithTitle(SERVER_ERROR_PAGE_TITLE)
  }
}

module.exports = ServerError

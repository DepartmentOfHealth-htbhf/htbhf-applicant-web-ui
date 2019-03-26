'use strict'

const Page = require('./page')
const PRIVACY_NOTICE_PAGE_TITLE = 'GOV.UK - Privacy notice'

/**
 * Page object for the privacy-notice page which is linked in the footer.
 */
class PrivacyNotice extends Page {
  getPath () {
    return '/privacy-notice'
  }

  getPageName () {
    return 'privacy-notice'
  }

  async waitForPageLoad () {
    return super.waitForPageWithTitle(PRIVACY_NOTICE_PAGE_TITLE)
  }
}

module.exports = PrivacyNotice

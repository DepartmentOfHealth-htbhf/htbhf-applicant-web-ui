'use strict'

const SubmittablePageWithRadioButtons = require('./submittable-page-with-radio-buttons')

const DO_YOU_LIVE_IN_SCOTLAND_ERROR_LINK_CSS = 'a[href="#do-you-live-in-scotland-error"]'
const DO_YOU_LIVE_IN_SCOTLAND_FIELD_ERROR_ID = 'doYouLiveInScotland-error'

const PAGE_TITLES = {
  en: 'GOV.UK - Do you live in Scotland?',
  cy: 'GOV.UK - Consectetur adipiscing elit Sceelan?'
}

/**
 * Page object for DoYouLiveInScotland page where the claimant enters whether they live in Scotland or not.
 */
class DoYouLiveInScotland extends SubmittablePageWithRadioButtons {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/do-you-live-in-scotland'
  }

  getPageName () {
    return 'do you live in Scotland'
  }

  getFieldErrorId () {
    return DO_YOU_LIVE_IN_SCOTLAND_FIELD_ERROR_ID
  }

  getErrorLinkCss () {
    return DO_YOU_LIVE_IN_SCOTLAND_ERROR_LINK_CSS
  }
}

module.exports = DoYouLiveInScotland

'use strict'

const SubmittablePageWithRadioButtons = require('./submittable-page-with-radio-buttons')

const CHOOSE_CHANNEL_FOR_CODE_ERROR_LINK_CSS = 'a[href="#choose-channel-for-code-error"]'
const CHOOSE_CHANNEL_FOR_CODE_FIELD_ERROR_ID = 'chooseChannelForCode-error'

const PAGE_TITLES = {
  en: 'GOV.UK - We’re sending you a code',
  cy: 'GOV.UK - Risus sed vulputate odio?'
}

/**
 * Page object for ChooseChannelForCode page where the claimant chooses how to receive their code.
 */
class ChooseChannelForCode extends SubmittablePageWithRadioButtons {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/choose-channel-for-code'
  }

  getPageName () {
    return 'choose channel for code'
  }

  getFieldErrorId () {
    return CHOOSE_CHANNEL_FOR_CODE_FIELD_ERROR_ID
  }

  getErrorLinkCss () {
    return CHOOSE_CHANNEL_FOR_CODE_ERROR_LINK_CSS
  }

  async selectTextRadioButton () {
    await super.selectRadioButton('text')
  }

  async selectEmailRadioButton () {
    await super.selectRadioButton('email')
  }
}

module.exports = ChooseChannelForCode

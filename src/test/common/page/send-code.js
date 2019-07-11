'use strict'

const SubmittablePageWithRadioButtons = require('./submittable-page-with-radio-buttons')
const { TEXT, EMAIL } = require('../steps/constants')

const SEND_CODE_ERROR_LINK_CSS = 'a[href="#channel-for-code-error"]'
const SEND_CODE_FIELD_ERROR_ID = 'channelForCode-error'

const PAGE_TITLES = {
  en: 'GOV.UK - We’re sending you a code',
  cy: 'GOV.UK - Risus sed vulputate odio?'
}

/**
 * Page object for SendCode page where the claimant chooses how to receive their code.
 */
class SendCode extends SubmittablePageWithRadioButtons {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/send-code'
  }

  getPageName () {
    return 'send code'
  }

  getChangeTextLink () {
    return this.findById('change-text')
  }

  getChangeEmailLink () {
    return this.findById('change-email')
  }

  getTextHint () {
    return this.getRadioButtonHint('text')
  }

  getEmailHint () {
    return this.getRadioButtonHint('email')
  }

  getFieldErrorId () {
    return SEND_CODE_FIELD_ERROR_ID
  }

  getErrorLinkCss () {
    return SEND_CODE_ERROR_LINK_CSS
  }

  async selectTextRadioButton () {
    await super.selectRadioButton(TEXT)
  }

  async selectEmailRadioButton () {
    await super.selectRadioButton(EMAIL)
  }
}

module.exports = SendCode

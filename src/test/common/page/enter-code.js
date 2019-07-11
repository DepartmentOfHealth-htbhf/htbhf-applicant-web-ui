'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - Enter your code',
  cy: 'GOV.UK - Risus sed vulputate odio'
}

const CONFIRMATION_CODE_FIELD_ERROR_ID = 'confirmation-code-error'
const CONFIRMATION_CODE_ERROR_LINK_CSS = 'a[href="#confirmation-code-error"]'

/**
 * Page object for enter code page where the confirmation code sent to the claimant is entered.
 */
class EnterCode extends SubmittablePage {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/enter-code'
  }

  getPageName () {
    return 'enter code'
  }

  async enterConfirmationCode (confirmationCode) {
    const confirmationCodeField = await this.getConfirmationCodeField()
    await confirmationCodeField.sendKeys(confirmationCode)
  }

  async getConfirmationCodeField () {
    return this.findById('confirmation-code')
  }

  getConfirmationCodeFieldErrorId () {
    return CONFIRMATION_CODE_FIELD_ERROR_ID
  }

  getConfirmationCodeLinkErrorCss () {
    return CONFIRMATION_CODE_ERROR_LINK_CSS
  }

  getRequestNewCodeLink () {
    return this.findById('request-new-code')
  }
}

module.exports = EnterCode

'use strict'

const Confirm = require('./confirm')
const CONFIRM_UPDATED_PAGE_TITLE = 'GOV.UK - Application updated'

/**
 * Page object for the confirmation page after submitting the claim.
 */
class ConfirmUpdated extends Confirm {
  async waitForPageLoad () {
    return super.waitForPageWithTitle(CONFIRM_UPDATED_PAGE_TITLE)
  }
}

module.exports = ConfirmUpdated

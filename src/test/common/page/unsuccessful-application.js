'use strict'

const SubmittablePage = require('./submittable-page')
const CONFIRM_PAGE_TITLE = 'GOV.UK - Application unsuccessful'
const GOV_UK_BODY = 'govuk-body'

/**
 * Page object for the confirmation page after submitting the claim.
 */
class UnsuccessfulApplication extends SubmittablePage {
  getPath () {
    return '/unsuccessful-application'
  }

  getPageName () {
    return 'Unsuccessful application'
  }

  async waitForPageLoad () {
    return super.waitForPageWithTitle(CONFIRM_PAGE_TITLE)
  }

  async getBodyText () {
    const body = await super.findByClassName(GOV_UK_BODY)
    return body.getText()
  }
}

module.exports = UnsuccessfulApplication

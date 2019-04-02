'use strict'

const SubmittablePage = require('./submittable-page')
const CONFIRM_PAGE_TITLE = 'GOV.UK - Application unsuccessful'
const PANEL_TITLE_CLASS = 'govuk-panel__title'
const PANEL_BODY_CLASS = 'govuk-panel__body'

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

  async getPanelTitleText () {
    const panelTitle = await this.findByClassName(PANEL_TITLE_CLASS)
    return panelTitle.getText()
  }

  async getPanelBodyText () {
    const panelBody = await this.findByClassName(PANEL_BODY_CLASS)
    return panelBody.getText()
  }
}

module.exports = UnsuccessfulApplication

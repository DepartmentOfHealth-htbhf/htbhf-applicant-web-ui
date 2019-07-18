'use strict'

const Page = require('./page')
const OVERVIEW_PAGE_TITLE = 'GOV.UK - Overview'

/**
 * Page object for the initial overview page that is shown when the app first loads.
 */
class Overview extends Page {
  getPath () {
    return '/'
  }

  getPageName () {
    return 'Apply for Healthy Start overview'
  }

  async waitForPageLoad () {
    return super.waitForPageWithTitle(OVERVIEW_PAGE_TITLE)
  }

  async getStartButton () {
    return this.findByClassName('govuk-button--start')
  }

  async clickStartButton () {
    const startButton = await this.getStartButton()
    return startButton.click()
  }
}

module.exports = Overview

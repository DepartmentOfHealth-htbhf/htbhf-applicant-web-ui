'use strict'

const Page = require('./page')

const PAGE_TITLES = {
  en: 'GOV.UK - You cannot apply if you live in Scotland',
  cy: 'GOV.UK - Sed do eiusmod tempor incididunt ut labore et dolore'
}

/**
 * Page object for In Scotland page where the claimant is told they cannot apply if they live in Scotland.
 */
class InScotland extends Page {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/in-scotland'
  }

  getPageName () {
    return 'I live in Scotland'
  }

  async getAllBodyText () {
    try {
      const bodyElements = await this.findAllByClassName('govuk-body')
      const textForBodyElements = bodyElements.map(async (element) => element.getText())
      return Promise.all(textForBodyElements)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = InScotland

'use strict'

const SubmittablePage = require('./submittable-page')

const PAGE_TITLES = {
  en: 'GOV.UK - Add your children’s dates of birth',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for AddChildrenDOB page where the claimant can enter their children's dates of birth.
 */
class AddChildrenDOB extends SubmittablePage {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/children-dob'
  }

  getPageName () {
    return 'add your childrens dates of birth'
  }
}

module.exports = AddChildrenDOB

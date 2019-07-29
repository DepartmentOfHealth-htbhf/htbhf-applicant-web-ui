'use strict'

const SubmittablePageWithRadioButtons = require('./submittable-page-with-radio-buttons')

const DO_YOU_HAVE_CHILDREN_ERROR_LINK_CSS = 'a[href="#do-you-have-children-error"]'
const DO_YOU_HAVE_CHILDREN_FIELD_ERROR_ID = 'doYouHaveChildren-error'

const PAGE_TITLES = {
  en: 'GOV.UK - Do you have any children under 4 years old?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for Do you have children page.
 */
class DoYouHaveChildren extends SubmittablePageWithRadioButtons {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/do-you-have-children'
  }

  getPageName () {
    return 'do you have children under four years old'
  }

  getFieldErrorId () {
    return DO_YOU_HAVE_CHILDREN_FIELD_ERROR_ID
  }

  getErrorLinkCss () {
    return DO_YOU_HAVE_CHILDREN_ERROR_LINK_CSS
  }
}

module.exports = DoYouHaveChildren

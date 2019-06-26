'use strict'

const SubmittablePageWithRadioButtons = require('./submittable-page-with-radio-buttons')

const DO_YOU_HAVE_CHILDREN_THREE_OR_UNDER_ERROR_LINK_CSS = 'a[href="#do-you-have-children-three-or-under-error"]'
const DO_YOU_HAVE_CHILDREN_THREE_OR_UNDER_FIELD_ERROR_ID = 'doYouHaveChildrenThreeOrUnder-error'

const PAGE_TITLES = {
  en: 'GOV.UK - Do you have any children who are three years old or under?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

/**
 * Page object for DoYouHaveChildrenThreeOrUnder page where the claimant enters whether they have any children three years old or younger or not.
 */
class DoYouHaveChildrenThreeOrUnder extends SubmittablePageWithRadioButtons {
  async waitForPageLoad (lang = 'en') {
    return super.waitForPageWithTitle(PAGE_TITLES[lang])
  }

  getPath () {
    return '/do-you-have-children-three-or-under'
  }

  getPageName () {
    return 'do you have children three or under'
  }

  getFieldErrorId () {
    return DO_YOU_HAVE_CHILDREN_THREE_OR_UNDER_FIELD_ERROR_ID
  }

  getErrorLinkCss () {
    return DO_YOU_HAVE_CHILDREN_THREE_OR_UNDER_ERROR_LINK_CSS
  }
}

module.exports = DoYouHaveChildrenThreeOrUnder

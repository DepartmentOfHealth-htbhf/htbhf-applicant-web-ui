const { assert } = require('chai')
const Promise = require('bluebird')

const { STEP_PAGE_ACTIONS } = require('./step-page-actions')
const { DEFAULT_ACTION_OPTIONS } = require('./default-action-options')
const pages = require('../pages')
const { isStepEnabled } = require('../../../../web/routes/register-steps')
const { features } = require('../../../../config')

const getPageIndex = (stepActions, pageName, pages) => stepActions.findIndex(pageAction => pageAction.page(pages).getPageName() === pageName)

// Uses isStepEnabled to enable / disable page navigation by the toggle specified
// To be concise “features” is referenced directly rather than being an argument
const getStepsUpToPage = (pageName, stepActions) => {
  const pageIndex = getPageIndex(stepActions, pageName, pages)
  if (pageIndex === -1) {
    throw new Error(`Unable to find page ${pageName}`)
  }
  return stepActions.slice(0, pageIndex + 1).filter(isStepEnabled(features))
}

const isNotFinalPage = (index, arrayLength) => index !== arrayLength - 1

const runPageActions = (actionOptions) => async (step, index, arrayLength) => {
  await step.page(pages).waitForPageLoad()
  if (isNotFinalPage(index, arrayLength)) {
    await step.actions(actionOptions)
  }
}

const enterDetailsUpToPage = async ({ pageName, stepActions = STEP_PAGE_ACTIONS, actionOptions = DEFAULT_ACTION_OPTIONS }) => {
  try {
    await pages.guidance.openApplyPage(pages.url)
    await pages.guidance.clickStartButton()
    await Promise.each(getStepsUpToPage(pageName, stepActions), runPageActions(actionOptions))
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter details up to page ${pageName} - ${error}`)
    throw new Error(error)
  }
}

const enterDetailsUpToCheckAnswersPage = async (actionOptions) => {
  await enterDetailsUpToPage({ pageName: pages.checkAnswers.getPageName(), actionOptions })
}

const enterDetailsUpToCheckAnswersPageForAPregnantWoman = async () => {
  const actionOptions = {
    ...DEFAULT_ACTION_OPTIONS,
    isClaimantPregnant: true
  }
  await enterDetailsUpToCheckAnswersPage(actionOptions)
}

const enterDetailsUpToCheckAnswersPageForANotPregnantWoman = async () => {
  const actionOptions = {
    ...DEFAULT_ACTION_OPTIONS,
    isClaimantPregnant: false
  }
  await enterDetailsUpToCheckAnswersPage(actionOptions)
}

module.exports = {
  enterDetailsUpToCheckAnswersPageForAPregnantWoman,
  enterDetailsUpToCheckAnswersPageForANotPregnantWoman,
  enterDetailsUpToPage
}

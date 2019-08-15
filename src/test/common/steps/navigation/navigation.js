const { assert } = require('chai')
const Promise = require('bluebird')

const { STEP_PAGE_ACTIONS } = require('./step-page-actions')
const { DEFAULT_ACTION_OPTIONS } = require('./default-action-options')
const pages = require('../pages')
const { isStepEnabled } = require('../../../../web/routes/register-steps')
const { features } = require('../../../../config')

const getPageIndex = (stepActions, pageName, pages) => stepActions.findIndex(pageAction => pageAction.page(pages).getPageName() === pageName)

// Uses isStepEnabled to enable/disable page navigation by the toggle specified
const getStepsUpToPage = (page, stepActions) => {
  const pageIndex = getPageIndex(stepActions, page, pages)
  if (pageIndex === -1) {
    throw new Error(`Unable to find page ${page}`)
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

const enterDetailsUpToPage = async ({ page, stepActions = STEP_PAGE_ACTIONS, actionOptions = DEFAULT_ACTION_OPTIONS }) => {
  try {
    await pages.guidance.openApplyPage(pages.url)
    await pages.guidance.clickStartButton()
    await Promise.each(getStepsUpToPage(page, stepActions), runPageActions(actionOptions))
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter details up to page ${page} - ${error}`)
    throw new Error(error)
  }
}

const enterDetailsUpToCheckDetailsPage = async (actionOptions) => {
  await enterDetailsUpToPage({ page: pages.check.getPageName(), actionOptions })
}

const enterDetailsUpToCheckDetailsPageForAPregnantWoman = async () => {
  const actionOptions = {
    ...DEFAULT_ACTION_OPTIONS,
    isClaimantPregnant: true
  }
  await enterDetailsUpToCheckDetailsPage(actionOptions)
}

const enterDetailsUpToCheckDetailsPageForANotPregnantWoman = async () => {
  const actionOptions = {
    ...DEFAULT_ACTION_OPTIONS,
    isClaimantPregnant: false
  }
  await enterDetailsUpToCheckDetailsPage(actionOptions)
}

module.exports = {
  enterDetailsUpToCheckDetailsPageForAPregnantWoman,
  enterDetailsUpToCheckDetailsPageForANotPregnantWoman,
  enterDetailsUpToPage
}

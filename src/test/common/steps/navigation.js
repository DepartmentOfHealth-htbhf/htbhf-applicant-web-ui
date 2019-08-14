const { Given, When, Then } = require('cucumber')
const { assert } = require('chai')

const pages = require('./pages')
const {
  enterNameAndSubmit,
  enterNinoAndSubmit,
  enterDateOfBirthAndSubmit,
  selectNoOnPregnancyPage,
  selectYesOnPregnancyPage,
  enterAddressAndSubmit,
  enterPhoneNumberAndSubmit,
  enterDoYouLiveInScotlandNoAndSubmit,
  enterEmailAddressAndSubmit,
  selectYesOnDoYouHaveChildrenPage,
  submitChild3OrUnderDetails,
  selectTextOnSendCode,
  enterConfirmationCodeAndSubmit
} = require('./common-steps')

const ENTER_NAME_PAGE = 'enter name'
const DO_YOU_LIVE_IN_SCOTLAND_PAGE = 'do you live in Scotland'
const ENTER_NINO_PAGE = 'enter national insurance'
const ENTER_DOB_PAGE = 'enter date of birth'
const DO_YOU_HAVE_CHILDREN_PAGE = 'do you have children under four years old'
const ARE_YOU_PREGNANT_PAGE = 'are you pregnant'
const ADDRESS_PAGE = 'address'
const PHONE_NUMBER_PAGE = 'phone number'
const EMAIL_ADDRESS_PAGE = 'email address'
const SEND_CODE_PAGE = 'send code'
const ENTER_CODE_PAGE = 'enter code'
const CHECK_PAGE = 'check details'
const ENTER_CHILDREN_DOB_PAGE = 'enter your childrens dates of birth'

const DEFAULT_ACTION_OPTIONS = {
  isClaimantPregnant: false
}

const pageActions = [
  {
    page: DO_YOU_LIVE_IN_SCOTLAND_PAGE,
    action: async () => {}
  },
  {
    page: ENTER_DOB_PAGE,
    action: async () => {
      await enterDoYouLiveInScotlandNoAndSubmit()
      await pages.enterDOB.waitForPageLoad()
    }
  },
  {
    page: DO_YOU_HAVE_CHILDREN_PAGE,
    action: async () => {
      await enterDateOfBirthAndSubmit()
      await pages.doYouHaveChildren.waitForPageLoad()
    }
  },
  {
    page: ENTER_CHILDREN_DOB_PAGE,
    action: async () => {
      await selectYesOnDoYouHaveChildrenPage()
      await pages.enterChildrenDOB.waitForPageLoad()
    }
  },
  {
    page: ARE_YOU_PREGNANT_PAGE,
    action: async () => {
      await submitChild3OrUnderDetails()
      await pages.areYouPregnant.waitForPageLoad()
    }
  },
  {
    page: ENTER_NAME_PAGE,
    action: async (actionOptions) => {
      actionOptions.isClaimantPregnant ? await selectYesOnPregnancyPage() : await selectNoOnPregnancyPage()
      await pages.enterName.waitForPageLoad()
    }
  },
  {
    page: ENTER_NINO_PAGE,
    action: async () => {
      await enterNameAndSubmit()
      await pages.enterNino.waitForPageLoad()
    }
  },
  {
    page: ADDRESS_PAGE,
    action: async () => {
      await enterNinoAndSubmit()
      await pages.manualAddress.waitForPageLoad()
    }
  },
  {
    page: PHONE_NUMBER_PAGE,
    action: async () => {
      await enterAddressAndSubmit()
      await pages.phoneNumber.waitForPageLoad()
    }
  },
  {
    page: EMAIL_ADDRESS_PAGE,
    action: async () => {
      await enterPhoneNumberAndSubmit()
      await pages.emailAddress.waitForPageLoad()
    }
  },
  {
    page: SEND_CODE_PAGE,
    action: async () => {
      await enterEmailAddressAndSubmit()
      await pages.sendCode.waitForPageLoad()
    }
  },
  {
    page: ENTER_CODE_PAGE,
    action: async () => {
      await selectTextOnSendCode()
      await pages.enterCode.waitForPageLoad()
    }
  },
  {
    page: CHECK_PAGE,
    action: async () => {
      await enterConfirmationCodeAndSubmit()
      await pages.check.waitForPageLoad()
    }
  }
]

const navigateToPage = async (page) => {
  try {
    await pages.openPageDirect(page)
  } catch (error) {
    throw new Error('Unexpected error caught navigating to page: ' + error)
  }
}

const getPageIndex = (pageName) => pageActions.findIndex(pageAction => pageAction.page === pageName)

const getActionsForPage = (index, actions) => actions.slice(0, index + 1).map(page => page.action)

const runPageActions = async (actions, actionOptions) => {
  for (const action of actions) {
    await action(actionOptions)
  }
}

const enterDetailsUpToPage = async (page, actions, actionOptions) => {
  try {
    await pages.guidance.openApplyPage(pages.url)
    await pages.guidance.clickStartButton()
    await pages.waitForFirstPage()

    const pageIndex = getPageIndex(page)
    if (pageIndex === -1) {
      throw new Error(`Unable to find page ${page}`)
    }

    const actionsForPage = getActionsForPage(pageIndex, actions)
    await runPageActions(actionsForPage, actionOptions)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enterDetailsUpToPage ${page} - ${error}`)
    throw new Error(error)
  }
}

const enterDetailsUpToCheckDetailsPage = async (actionOptions) => {
  await enterDetailsUpToPage(CHECK_PAGE, pageActions, actionOptions)
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

Given(/^I have entered my details up to the (.*) page$/, async function (page) {
  try {
    await enterDetailsUpToPage(page, pageActions, DEFAULT_ACTION_OPTIONS)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter details up to page ${page} - ${error}`)
    throw new Error(error)
  }
})

Given(/^I am starting a new application$/, async function () {
  await pages.guidance.openApplyPage(pages.url)
})

When(/^I click the Cookies link$/, async function () {
  await pages.overview.clickCookieLink()
})

When(/^I navigate to the (.*) page$/, async function (page) {
  await navigateToPage(page)
})

When(/^I go directly to the send code page$/, async function () {
  await pages.sendCode.openDirect(pages.url)
})

When(/^I go directly to the enter code page$/, async function () {
  await pages.enterCode.openDirect(pages.url)
})

When(/^I select to start the process$/, async function () {
  await pages.guidance.clickStartButton()
})

Then(/^I am shown the first page of the application$/, async function () {
  await pages.waitForFirstPage()
})

module.exports = {
  enterDetailsUpToCheckDetailsPageForAPregnantWoman,
  enterDetailsUpToCheckDetailsPageForANotPregnantWoman
}

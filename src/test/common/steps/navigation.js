const { Given, When } = require('cucumber')
const { assert } = require('chai')

const pages = require('./pages')
const { enterNameAndSubmit, enterNinoAndSubmit, enterDateOfBirthAndSubmit, selectNoOnPregnancyPage, enterCardAddressAndSubmit } = require('./common-steps')

const ENTER_NAME_PAGE = 'enter name'
const ENTER_NINO_PAGE = 'enter national insurance'
const ENTER_DOB_PAGE = 'enter date of birth'
const ARE_YOU_PREGNANT_PAGE = 'are you pregnant'
const CARD_ADDRESS_PAGE = 'card address'
const CHECK_PAGE = 'check details'

const pageActions = [
  {
    page: ENTER_DOB_PAGE,
    action: async () => {}
  },
  {
    page: ARE_YOU_PREGNANT_PAGE,
    action: async () => {
      await enterDateOfBirthAndSubmit()
      await pages.areYouPregnant.waitForPageLoad()
    }
  },
  {
    page: ENTER_NAME_PAGE,
    action: async () => {
      await selectNoOnPregnancyPage()
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
    page: CARD_ADDRESS_PAGE,
    action: async () => {
      await enterNinoAndSubmit()
      await pages.cardAddress.waitForPageLoad()
    }
  },
  {
    page: CHECK_PAGE,
    action: async () => {
      await enterCardAddressAndSubmit()
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

const runPageActions = async (actions) => {
  for (const action of actions) {
    await action()
  }
}

const enterDetailsUpToPage = async (page, actions) => {
  try {
    await pages.overview.open(pages.url)
    await pages.overview.clickStartButton()
    await pages.enterDOB.waitForPageLoad()

    const pageIndex = getPageIndex(page)
    if (pageIndex === -1) {
      throw new Error(`Unable to find page ${page}`)
    }

    const actionsForPage = getActionsForPage(pageIndex, actions)
    await runPageActions(actionsForPage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enterDetailsUpToPage ${page} - ${error}`)
    throw new Error(error)
  }
}

Given(/^I have entered my details up to the (.*) page$/, async function (page) {
  try {
    await enterDetailsUpToPage(page, pageActions)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter details up to page ${page} - ${error}`)
    throw new Error(error)
  }
})

When(/^I click the Cookies link$/, async function () {
  await pages.overview.clickCookieLink()
})

When(/^I navigate to the (.*) page$/, async function (page) {
  await navigateToPage(page)
})

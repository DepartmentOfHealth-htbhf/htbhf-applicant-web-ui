const { Given, When } = require('cucumber')

const pages = require('./pages')
const { enterNameAndSubmit, enterNinoAndSubmit, enterDateOfBirth, selectNoOnPregnancyPage } = require('./common-steps')
const { VALID_NINO, FIRST_NAME, LAST_NAME, DAY, MONTH, YEAR } = require('./constants')

const ENTER_NAME_PAGE = 'enter name'
const ENTER_NINO_PAGE = 'enter national insurance'
const ENTER_DOB_PAGE = 'enter date of birth'
const ARE_YOU_PREGNANT_PAGE = 'are you pregnant'
const CARD_ADDRESS_PAGE = 'card address'
const CHECK_PAGE = 'check details'

const pageActions = [
  {
    page: ENTER_NAME_PAGE,
    action: () => {}
  },
  {
    page: ENTER_NINO_PAGE,
    action: async () => enterNameAndSubmit(FIRST_NAME, LAST_NAME)
  },
  {
    page: ENTER_DOB_PAGE,
    action: async () => enterNinoAndSubmit(VALID_NINO)
  },
  {
    page: ARE_YOU_PREGNANT_PAGE,
    action: async () => enterDateOfBirth(DAY, MONTH, YEAR)
  },
  {
    page: CARD_ADDRESS_PAGE,
    action: async () => selectNoOnPregnancyPage()
  },
  {
    page: CHECK_PAGE,
    action: async () => pages.check.submitForm()
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
  await pages.overview.open(pages.url)
  await pages.overview.clickStartButton()
  await pages.enterName.waitForPageLoad()

  const pageIndex = getPageIndex(page)
  if (pageIndex === -1) {
    throw new Error(`Unable to find page ${page}`)
  }

  const actionsForPage = getActionsForPage(pageIndex, actions)
  await runPageActions(actionsForPage)
}

Given(/^I have entered my details up to the (.*) page$/, async function (page) {
  await enterDetailsUpToPage(page, pageActions)
})

When(/^I click the Cookies link$/, async function () {
  await pages.overview.clickCookieLink()
})

When(/^I navigate to the (.*) page$/, async function (page) {
  await navigateToPage(page)
})

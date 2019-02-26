const { Given, When } = require('cucumber')

const pages = require('./pages')
const { enterNameAndSubmit, enterNinoAndSubmit, enterDateOfBirth, selectNoOnPregnancyPage, completeTheApplicationAsAWomanWhoIsNotPregnant } = require('./common-steps')
const { VALID_NINO, FIRST_NAME, LAST_NAME, DAY, MONTH, YEAR } = require('./constants')

const ENTER_NAME_PAGE = 'enter name'
const ENTER_NINO_PAGE = 'enter national insurance'
const ENTER_DOB_PAGE = 'enter date of birth'
const ARE_YOU_PREGNANT_PAGE = 'are you pregnant'
const CARD_ADDRESS_PAGE = 'card address'
const CHECK_PAGE = 'check details'

Given(/^I have entered my details up to the (.*) page$/, async function (page) {
  await enterDetailsUpToPage(page)
})

When(/^I click the Cookies link$/, async function () {
  await pages.overview.clickCookieLink()
})

When(/^I navigate to the (.*) page$/, async function (page) {
  await navigateToPage(page)
})

async function navigateToPage (page) {
  try {
    await pages.openPageDirect(page)
  } catch (error) {
    throw new Error('Unexpected error caught navigating to page: ' + error)
  }
}

async function enterDetailsUpToPage (page) {
  await pages.overview.open(pages.url)
  await pages.overview.clickStartButton()
  await pages.enterName.waitForPageLoad()
  switch (page) {
    case ENTER_NAME_PAGE:
      // This intentionally does nothing as its the first page
      break
    case ENTER_NINO_PAGE:
      await enterNameAndSubmit(FIRST_NAME, LAST_NAME)
      break
    case ENTER_DOB_PAGE:
      await enterNameAndSubmit(FIRST_NAME, LAST_NAME)
      await enterNinoAndSubmit(VALID_NINO)
      break
    case ARE_YOU_PREGNANT_PAGE:
      await enterNameAndSubmit(FIRST_NAME, LAST_NAME)
      await enterNinoAndSubmit(VALID_NINO)
      await enterDateOfBirth(DAY, MONTH, YEAR)
      break
    case CARD_ADDRESS_PAGE:
      await enterNameAndSubmit(FIRST_NAME, LAST_NAME)
      await enterNinoAndSubmit(VALID_NINO)
      await enterDateOfBirth(DAY, MONTH, YEAR)
      await selectNoOnPregnancyPage()
      break
    case CHECK_PAGE:
      await completeTheApplicationAsAWomanWhoIsNotPregnant()
      break
    default:
      throw new Error('Invalid page name provided for navigation: ' + page)
  }
}

const { When } = require('cucumber')

const pages = require('./pages')
const { openOverviewPage } = require('./common-steps')

When(/^I click the Cookies link$/, async function () {
  await pages.overview.clickCookieLink()
})

When(/^I navigate to the (.*) page$/, async function (page) {
  await navigateToPage(page)
})

async function navigateToPage (page) {
  const baseUrl = pages.url
  switch (page) {
    case 'HTBHF overview':
      openOverviewPage()
      break
    case 'Enter Name':
      await pages.enterName.openEnterNameUrl(baseUrl)
      break
    case 'Enter Nino':
      await pages.enterNino.openEnterNinoUrl(baseUrl)
      break
    case 'Enter DOB':
      await pages.enterDOB.openEnterDobUrl(baseUrl)
      break
    case 'Are You Pregnant':
      await pages.areYouPregnant.openAreYouPregnantUrl(baseUrl)
      break
    case 'Card Address':
      await pages.cardAddress.openCardAddressUrl(baseUrl)
      break
    default:
      throw new Error('Invalid page name provided for navigation: ' + page)
  }
}

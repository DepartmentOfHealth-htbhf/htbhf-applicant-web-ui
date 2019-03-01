const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')

const GOV_UK_TABLE_CLASSNAME = 'govuk-table'

When(/^I click on the cookies link$/, async function () {
  await pages.genericPage.clickCookieLink()
})

Then(/^the cookies page is shown$/, async function () {
  await pages.cookies.waitForPageLoad()
})

Then(/^all page content is present on the cookies page$/, async function () {
  await checkAllCookiePageContentIsPresentAndCorrect()
})

Then(/^no back link is shown$/, async function () {
  const backLinkPresent = await pages.cookies.isBackLinkPresent()
  expect(backLinkPresent).to.equal(false)
})

Then(/^the back link on the cookies page links to the enter name page$/, async function () {
  const backLink = await pages.cookies.getBackLink()
  const href = await backLink.getAttribute('href')

  // using startsWith() instead of equals() so query parameters do not fail the test
  const enterNameUrl = `${pages.url}${pages.enterName.getPath()}`
  expect(href.startsWith(enterNameUrl)).to.equal(true)
})

async function checkAllCookiePageContentIsPresentAndCorrect () {
  const h1Text = await pages.cookies.getH1Text()
  expect(h1Text.toString().trim()).to.be.equal('Cookies', 'expected cookies page H1 text to be correct')
  const h2Text = await pages.cookies.getH2Text()
  expect(h2Text.toString().trim()).to.be.equal('Google Analytics cookie', 'expected cookies page H2 text to be correct')

  // Make sure that there is a table on the page (this is the specific cookie details)
  await pages.cookies.findByClassName(GOV_UK_TABLE_CLASSNAME)
}

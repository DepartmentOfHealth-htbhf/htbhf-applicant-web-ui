const { Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')

const GOV_UK_TABE_CLASSNAME = 'govuk-table'

Then(/^the cookies page is shown$/, async function () {
  await pages.cookies.waitForPageLoad()
})

Then(/^all page content is present on the cookies page$/, async function () {
  await checkAllCookiePageContentIsPresentAndCorrect()
})

async function checkAllCookiePageContentIsPresentAndCorrect () {
  const h1Text = await pages.cookies.getH1Text()
  expect(h1Text.toString().trim()).to.be.equal('Cookies', 'expected cookies page H1 text to be correct')
  const h2Text = await pages.cookies.getH2Text()
  expect(h2Text.toString().trim()).to.be.equal('Google Analytics cookie', 'expected cookies page H2 text to be correct')

  // Make sure that there is a table on the page (this is the specific cookie details)
  await pages.cookies.findByClassName(GOV_UK_TABE_CLASSNAME)
}

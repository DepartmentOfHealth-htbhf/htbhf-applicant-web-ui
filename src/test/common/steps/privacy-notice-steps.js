const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')

const GOV_UK_TABLE_CLASSNAME = 'govuk-table'

When(/^I click on the privacy-notice link$/, async function () {
  await pages.genericPage.clickPrivacyNoticeLink()
})

Then(/^the privacy-notice page is shown$/, async function () {
  await pages.privacyNotice.waitForPageLoad()
})

Then(/^all page content is present on the privacy-notice page$/, async function () {
  await checkPrivacyNoticePageContentIsPresentAndCorrect()
})

Then(/^the back link on the privacy-notice page links to the enter name page$/, async function () {
  const backLink = await pages.privacyNotice.getBackLink()
  const href = await backLink.getAttribute('href')

  // using startsWith() instead of equals() so query parameters do not fail the test
  const enterNameUrl = `${pages.url}${pages.enterName.getPath()}`
  expect(href.startsWith(enterNameUrl)).to.equal(true)
})

async function checkPrivacyNoticePageContentIsPresentAndCorrect () {
  const h1Text = await pages.privacyNotice.getH1Text()
  expect(h1Text.toString().trim()).to.be.equal('Privacy notice', 'expected privacy-notice page H1 text to be correct')
  const h2Text = await pages.privacyNotice.getH2Text()
  expect(h2Text.toString().trim()).to.be.equal('What personal information do we ask for?', 'expected privacy-notice page H2 text to be correct')

  // Make sure that there is a table on the page (this is the specific cookie details)
  const allTables = await pages.privacyNotice.findAllByClassName(GOV_UK_TABLE_CLASSNAME)
  expect(allTables).to.have.lengthOf.at.least(1, 'expect to find at least one table on privacy-notice page')
}

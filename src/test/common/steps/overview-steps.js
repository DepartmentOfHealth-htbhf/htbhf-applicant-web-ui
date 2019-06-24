const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')

Given(/^I am starting a new application$/, async function () {
  await pages.overview.openDirect(pages.url)
})

When(/^I select to start the process$/, async function () {
  await pages.overview.clickStartButton()
})

Then(/^I am shown the overview page$/, async function () {
  await pages.overview.waitForPageLoad()
})

Then(/^I am shown the first page of the application$/, async function () {
  await pages.waitForFirstPage()
})

// The original session id is stored on the Overview page, but to get a new session id we need to make sure
// that we navigate to a subsequent page (back to the Overview page is sufficient) to check for a new session id
// We also verify that the lang cookie has been removed
Then(/^my session has been destroyed$/, async function () {
  const pageSessionId = pages.overview.sessionId
  const langCookie = await pages.overview.getLangCookie()
  expect(langCookie).to.be.equal(undefined)
  await pages.overview.openDirect(pages.url)
  const currentSessionId = await pages.overview.getCurrentSessionId()
  expect(pageSessionId).not.to.be.equal(currentSessionId)
})

Then(/^my session has not been destroyed$/, async function () {
  const pageSessionId = pages.overview.sessionId
  const langCookie = await pages.overview.getLangCookie()
  expect(langCookie).not.to.be.equal(undefined)
  await pages.overview.openDirect(pages.url)
  const currentSessionId = await pages.overview.getCurrentSessionId()
  expect(pageSessionId).to.be.equal(currentSessionId)
})

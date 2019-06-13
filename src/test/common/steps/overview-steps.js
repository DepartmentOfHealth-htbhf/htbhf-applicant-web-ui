const { Given, When, Then } = require('cucumber')

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

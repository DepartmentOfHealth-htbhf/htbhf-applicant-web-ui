const { Given, When } = require('cucumber')

const pages = require('./pages')

Given(/^I am starting a new application$/, async function () {
  await pages.overview.openDirect(pages.url)
})

When(/^I select to start the process$/, async function () {
  await pages.overview.clickStartButton()
})

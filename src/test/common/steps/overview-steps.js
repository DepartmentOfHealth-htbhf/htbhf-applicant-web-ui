const { Given, When } = require('cucumber')

const pages = require('./pages')
const { openOverviewPage } = require('./common-steps')

Given(/^I am starting a new application$/, async function () {
  await openOverviewPage()
})

When(/^I select to start the process$/, async function () {
  await pages.overview.clickStartButton()
})

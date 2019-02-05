const { Given, When, Then } = require('cucumber')

const {
  selectYesOnPregnancyPage,
  enterNameAndSubmit,
  enterNinoAndSubmit,
  enterDateOfBirth,
  enterCardAddress
} = require('./common-steps')

const pages = require('./pages')
const { VALID_NINO } = require('./constants')

Given('I am on the first page of the application', async function () {
  await pages.enterName.open(pages.url)
})

When(/^I complete the application with valid details$/, async function () {
  await enterNameAndSubmit('Lisa', 'Simpson')
  await enterNinoAndSubmit(VALID_NINO)
  await enterDateOfBirth('30', '12', '1980')
  await selectYesOnPregnancyPage()
  await enterCardAddress('Flat b', '123 Fake street', 'Springfield', 'AA11BB')
})

Then(/^I am shown the check details page$/, async function () {
  await pages.check.waitForPageLoad()
})

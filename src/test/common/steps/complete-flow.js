const { Given, When, Then } = require('cucumber')

const {
  selectYesOnPregnancyPage,
  enterNameAndSubmit,
  enterNinoAndSubmit,
  enterDateOfBirth,
  enterCardAddress
} = require('./common-steps')

const pages = require('./pages')
const { VALID_NINO, FIRST_NAME, LAST_NAME, DAY, MONTH, YEAR, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, POSTCODE } = require('./constants')

Given('I am on the first page of the application', async function () {
  await pages.enterName.open(pages.url)
})

When(/^I complete the application with valid details for a pregnant woman$/, async function () {
  await enterNameAndSubmit(FIRST_NAME, LAST_NAME)
  await enterNinoAndSubmit(VALID_NINO)
  await enterDateOfBirth(DAY, MONTH, YEAR)
  await selectYesOnPregnancyPage()
  await enterCardAddress(ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, POSTCODE)
})

Then(/^I am shown the check details page$/, async function () {
  await pages.check.waitForPageLoad()
})

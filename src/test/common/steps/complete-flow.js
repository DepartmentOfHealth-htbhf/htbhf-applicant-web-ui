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

async function completeTheApplicationAsAPregnantWoman () {
  await enterNameAndSubmit(FIRST_NAME, LAST_NAME)
  await enterNinoAndSubmit(VALID_NINO)
  await enterDateOfBirth(DAY, MONTH, YEAR)
  await selectYesOnPregnancyPage()
  await enterCardAddress(ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, POSTCODE)
}

Given('I am on the first page of the application', async function () {
  await pages.enterName.open(pages.url)
})

Given('I am on the check details page having entered valid details for a pregnant woman', async function () {
  await pages.enterName.open(pages.url)
  await completeTheApplicationAsAPregnantWoman()
  await pages.check.waitForPageLoad()
})

When(/^I complete the application with valid details for a pregnant woman$/, async function () {
  await completeTheApplicationAsAPregnantWoman()
})

Then(/^I am shown the check details page$/, async function () {
  await pages.check.waitForPageLoad()
})

const { Given, When } = require('cucumber')

const {
  completeTheApplicationAsAPregnantWoman,
  completeTheApplicationAsAWomanWhoIsNotPregnant
} = require('./common-steps')
const { setupSuccessfulWiremockClaimMapping } = require('../wiremock')

const pages = require('./pages')

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

When(/^I complete the application with valid details for a woman who is not pregnant$/, async function () {
  await completeTheApplicationAsAWomanWhoIsNotPregnant()
})

Given(/^I submit an application with valid details$/, async function () {
  await pages.enterName.open(pages.url)
  await completeTheApplicationAsAWomanWhoIsNotPregnant()
  await pages.check.waitForPageLoad()
  await setupSuccessfulWiremockClaimMapping()
  await pages.genericPage.submitForm()
})

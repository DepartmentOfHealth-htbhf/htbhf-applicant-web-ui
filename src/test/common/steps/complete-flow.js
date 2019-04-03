const { Given, When } = require('cucumber')

const {
  completeTheApplicationAsAPregnantWoman,
  completeTheApplicationAsAWomanWhoIsNotPregnant
} = require('./common-steps')
const { setupWiremockMappingsWithStatus } = require('./common-steps')

const pages = require('./pages')

const ELIGIBLE = 'ELIGIBLE'

Given('I am on the first page of the application', async function () {
  await pages.enterName.open(pages.url)
})

Given('I am on the check details page having entered valid details for a pregnant woman', async function () {
  await pages.enterName.open(pages.url)
  await completeTheApplicationAsAPregnantWoman()
  await pages.check.waitForPageLoad()
})

Given(/^I have completed my application$/, async function () {
  await pages.enterName.open(pages.url)
  await submitApplicationWithStatus(ELIGIBLE)
  await pages.confirm.waitForPageLoad()
})

When(/^I complete the application with valid details for a pregnant woman$/, async function () {
  await completeTheApplicationAsAPregnantWoman()
})

When(/^I complete the application with valid details for a woman who is not pregnant$/, async function () {
  await completeTheApplicationAsAWomanWhoIsNotPregnant()
})

Given(/^I submit an application with valid details$/, async function () {
  await submitApplicationWithStatus(ELIGIBLE)
})

When(/^I submit an application which returns a (.*) eligibility status$/, async function (status) {
  await submitApplicationWithStatus(status)
})

async function submitApplicationWithStatus (status) {
  await pages.enterName.open(pages.url)
  await completeTheApplicationAsAPregnantWoman()
  await pages.check.waitForPageLoad()
  await setupWiremockMappingsWithStatus(status)
  await pages.genericPage.submitForm()
}

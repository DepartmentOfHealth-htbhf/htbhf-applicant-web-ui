const { Given, When } = require('cucumber')

const {
  enterDetailsUpToCheckAnswersPageForAPregnantWoman,
  enterDetailsUpToCheckAnswersPageForANotPregnantWoman
} = require('./navigation')
const { setupWiremockMappingsWithStatus, setupWiremockUpdatedClaimMapping } = require('./common-steps')
const { acceptTsAndCsAndSubmitApplication } = require('./terms-and-conditions-steps')

const pages = require('./pages')

const ELIGIBLE = 'ELIGIBLE'

Given('I am on the first page of the application', async function () {
  await pages.startApplication()
})

Given('I am on the check answers page having entered valid details for a pregnant woman', async function () {
  await enterDetailsUpToCheckAnswersPageForAPregnantWoman()
})

Given(/^I have completed my application$/, async function () {
  await submitApplicationWithStatus(ELIGIBLE)
  await pages.confirm.waitForPageLoad()
})

When(/^I complete the application with valid details for a pregnant woman$/, async function () {
  await enterDetailsUpToCheckAnswersPageForAPregnantWoman()
})

When(/^I complete the application with valid details for a woman who is not pregnant$/, async function () {
  await enterDetailsUpToCheckAnswersPageForANotPregnantWoman()
})

When(/^I complete the application with valid details$/, async function () {
  await enterDetailsUpToCheckAnswersPageForANotPregnantWoman()
})

Given(/^I submit an application with valid details$/, async function () {
  await submitApplicationWithStatus(ELIGIBLE)
})

Given(/^I submit an application to update an existing claim$/, async function () {
  await submitApplicationForUpdatedClaim()
})

When(/^I submit an application which returns a (.*) eligibility status$/, async function (status) {
  await submitApplicationWithStatus(status)
})

async function submitApplicationWithStatus (status) {
  await enterDetailsUpToCheckAnswersPageForAPregnantWoman()
  await setupWiremockMappingsWithStatus(status)
  await acceptTsAndCsAndSubmitApplication()
}

async function submitApplicationForUpdatedClaim () {
  await enterDetailsUpToCheckAnswersPageForAPregnantWoman()
  await setupWiremockUpdatedClaimMapping()
  await acceptTsAndCsAndSubmitApplication()
}

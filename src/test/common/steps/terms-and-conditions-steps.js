const { Given, When, Then } = require('cucumber')

const pages = require('./pages')
const { assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect, setupWiremockMappingsWithStatus } = require('./common-steps')

async function acceptTsAndCs () {
  await pages.termsAndConditions.openDirect(pages.url)
  await pages.termsAndConditions.selectCheckbox()
}

async function acceptTsAndCsAndSubmitApplication () {
  await acceptTsAndCs()
  await pages.termsAndConditions.submitForm()
}

Given(/^I accept the terms and conditions$/, async function () {
  await acceptTsAndCs()
})

When(/^I accept the terms and conditions and submit my application$/, async function () {
  await setupWiremockMappingsWithStatus('ELIGIBLE')
  await acceptTsAndCsAndSubmitApplication()
})

When(/^I click continue without accepting the terms and conditions$/, async function () {
  await pages.termsAndConditions.openDirect(pages.url)
  await pages.termsAndConditions.submitForm()
})

Then('I am told I must accept the terms and conditions', async function () {
  await assertErrorHeaderTextPresent(pages.termsAndConditions)
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.termsAndConditions.getFieldErrorId(),
    pages.termsAndConditions.getErrorLinkCss(),
    'Confirm that you’ve read and will comply with these terms and conditions')
})

Then(/^I am shown the terms and conditions page$/, async function () {
  await pages.termsAndConditions.waitForPageLoad()
})

module.exports = {
  acceptTsAndCsAndSubmitApplication
}

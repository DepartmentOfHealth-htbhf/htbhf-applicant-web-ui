const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { enterNinoAndSubmit } = require('./common-steps')
const { assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-assertions')

When(/^I enter a valid national insurance number$/, async function () {
  return enterNinoAndSubmit()
})

When(/^I enter (.*) as my national insurance number$/, async function (nino) {
  return enterNinoAndSubmit(nino)
})

When(/^I do not enter a national insurance number$/, async function () {
  return enterNinoAndSubmit('')
})

Then(/^I am informed that the national insurance number is in the wrong format$/, async function () {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.nationalInsuranceNumber.inputField.getInputErrorId(),
    pages.nationalInsuranceNumber.inputField.getInputErrorLinkCss(),
    'Enter a National Insurance number in the correct format')
})

Then(/^I see the value (.*) in the textbox$/, async function (nino) {
  const enteredNino = await pages.nationalInsuranceNumber.inputField.getValue()
  expect(enteredNino).to.be.equal(nino)
})

Then(/^I am shown the enter national insurance number page$/, async function () {
  await pages.nationalInsuranceNumber.waitForPageLoad()
})

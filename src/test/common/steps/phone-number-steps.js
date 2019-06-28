const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { enterPhoneNumberAndSubmit, assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-steps')

When(/^I enter (.*) as my phone number$/, async function (phoneNumber) {
  return enterPhoneNumberAndSubmit(phoneNumber)
})

When(/^I do not enter a phone number$/, async function () {
  return enterPhoneNumberAndSubmit('')
})

Then(/^I am shown the phone number page$/, async function () {
  await pages.phoneNumber.waitForPageLoad()
})

Then(/^I am informed that I must enter in a valid phone number$/, async function () {
  await assertErrorHeaderTextPresent(pages.phoneNumber)
  await assertPhoneNumberErrorFieldAndLink('Enter a UK mobile number')
})

Then(/^I see the value (.*) in the phone number textbox$/, async function (phoneNumber) {
  const enteredPhoneNumber = await pages.phoneNumber.getPhoneNumberValue()
  expect(enteredPhoneNumber).to.be.equal(phoneNumber)
})

async function assertPhoneNumberErrorFieldAndLink (expectedErrorMessage) {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.phoneNumber.getPhoneNumberFieldErrorId(),
    pages.phoneNumber.getPhoneNumberLinkErrorCss(),
    expectedErrorMessage)
}

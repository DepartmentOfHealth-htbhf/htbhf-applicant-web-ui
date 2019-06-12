const { When, Then } = require('cucumber')
const { expect, assert } = require('chai')

const pages = require('./pages')
const { enterPhoneNumberAndSubmit, assertErrorHeaderTextPresent } = require('./common-steps')

When(/^I enter (.*) as my phone number$/, async function (phoneNumber) {
  return enterPhoneNumberAndSubmit(phoneNumber)
})

When(/^I do not enter a phone number$/, async function () {
  return enterPhoneNumberAndSubmit('')
})

Then(/^I am shown the phone number page$/, async function () {
  await pages.phoneNumber.waitForPageLoad()
})

Then(/^I am informed that the phone number is required$/, async function () {
  await assertErrorHeaderTextPresent(pages.phoneNumber)
  await assertPhoneNumberErrorFieldAndLink('Enter a UK mobile number')
})

Then(/^I am informed that the phone number is in the wrong format$/, async function () {
  await assertErrorHeaderTextPresent(pages.phoneNumber)
  await assertPhoneNumberErrorFieldAndLink('Enter in a valid UK mobile number')
})

Then(/^I see the value (.*) in the phone number textbox$/, async function (phoneNumber) {
  const enteredPhoneNumber = await pages.phoneNumber.getPhoneNumberValue()
  expect(enteredPhoneNumber).to.be.equal(phoneNumber)
})

async function assertPhoneNumberErrorFieldAndLink (expectedErrorMessage) {
  try {
    const errorFieldText = await pages.phoneNumber.getPhoneNumberFieldErrorText()
    const errorLinkText = await pages.phoneNumber.getPhoneNumberLinkErrorText()

    expect(errorFieldText).to.be.equal(expectedErrorMessage)
    expect(errorLinkText).to.be.equal(expectedErrorMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert last name error message is present - ${error}`)
  }
}

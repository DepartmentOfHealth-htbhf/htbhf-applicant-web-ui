const { When, Then } = require('cucumber')

const { PHONE_NUMBER_2, EMAIL_ADDRESS_2 } = require('./constants')
const pages = require('./pages')
const { enterDetailsUpToPage } = require('./navigation')

const {
  enterPhoneNumberAndSubmit,
  enterEmailAddressAndSubmit,
  selectTextOnSendCode,
  selectEmailOnSendCode,
  enterConfirmationCodeAndSubmit
} = require('./common-steps')

When(/^I complete the application with valid details, selecting to receive my confirmation code via text$/, async function () {
  await enterDetailsUpToPage({ page: pages.sendCode.getPageName() })
  await selectTextOnSendCode()
  await enterConfirmationCodeAndSubmit()
})

When(/^I complete the application with valid details, selecting to receive my confirmation code via email$/, async function () {
  await enterDetailsUpToPage({ page: pages.sendCode.getPageName() })
  await selectEmailOnSendCode()
  await enterConfirmationCodeAndSubmit()
})

When(/^I enter in a new phone number$/, async function () {
  // the phone number text box will contain the previously entered number, need to clear it before entering new number
  await pages.phoneNumber.inputField.clearValue()
  await enterPhoneNumberAndSubmit(PHONE_NUMBER_2)
})

When(/^I enter in a new email address/, async function () {
  // the email address text box will contain the previously entered email address, need to clear it before entering new email address
  await pages.emailAddress.inputField.clearValue()
  await enterEmailAddressAndSubmit(EMAIL_ADDRESS_2)
})

Then(/^I must complete all steps after the phone number page, including entering a new code$/, async function () {
  // The email address will already be filled in, no need to enter one in
  await pages.emailAddress.submitForm()
  await selectTextOnSendCode()
  await enterConfirmationCodeAndSubmit()
})

Then(/^I must complete all steps after the email address page, including entering a new code$/, async function () {
  await selectEmailOnSendCode()
  await enterConfirmationCodeAndSubmit()
})

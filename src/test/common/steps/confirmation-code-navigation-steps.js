const { When, Then } = require('cucumber')

const { PHONE_NUMBER_2, EMAIL_ADDRESS_2 } = require('./constants')
const pages = require('./pages')

const {
  selectNoOnPregnancyPage,
  enterNameAndSubmit,
  enterNinoAndSubmit,
  enterDateOfBirthAndSubmit,
  enterAddressAndSubmit,
  enterPhoneNumberAndSubmit,
  enterDoYouLiveInScotlandNoAndSubmit,
  enterEmailAddressAndSubmit,
  selectNoOnChildrenThreeOrYoungerPage,
  selectTextOnSendCode,
  selectEmailOnSendCode,
  enterConfirmationCodeAndSubmit
} = require('./common-steps')

When(/^I complete the application with valid details, selecting to receive my confirmation code via text$/, async function () {
  await completeProcessUpToSendCode()
  await selectTextOnSendCode()
  await enterConfirmationCodeAndSubmit()
})

When(/^I complete the application with valid details, selecting to receive my confirmation code via email$/, async function () {
  await completeProcessUpToSendCode()
  await selectEmailOnSendCode()
  await enterConfirmationCodeAndSubmit()
})

When(/^I enter in a new phone number$/, async function () {
  // the phone number text box will contain the previously entered number, need to clear it before entering new number
  await pages.phoneNumber.clearPhoneNumber()
  await enterPhoneNumberAndSubmit(PHONE_NUMBER_2)
})

When(/^I enter in a new email address/, async function () {
  // the email address text box will contain the previously entered email address, need to clear it before entering new email address
  await pages.emailAddress.clearEmailAddress()
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

async function completeProcessUpToSendCode () {
  await enterDoYouLiveInScotlandNoAndSubmit()
  await enterDateOfBirthAndSubmit()
  await selectNoOnChildrenThreeOrYoungerPage()
  await selectNoOnPregnancyPage()
  await enterNameAndSubmit()
  await enterNinoAndSubmit()
  await enterAddressAndSubmit()
  await enterPhoneNumberAndSubmit()
  await enterEmailAddressAndSubmit()
}

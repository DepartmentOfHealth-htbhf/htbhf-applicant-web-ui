const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { enterEmailAddressAndSubmit, assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-steps')

// create an email address in with valid format but over 256 characters long
const LONG_EMAIL_ADDRESS = `${new Array(256).join('A')}@email.com`

When(/^I enter a valid email address$/, async function () {
  return enterEmailAddressAndSubmit()
})

When(/^I do not enter an email address$/, async function () {
  return enterEmailAddressAndSubmit('')
})

When(/^I enter an email address that is too long$/, async function () {
  return enterEmailAddressAndSubmit(LONG_EMAIL_ADDRESS)
})

When(/^I enter (.*) as my email address/, async function (emailAddress) {
  // disable html5 form validation as this brings up a dialog box on chrome which interferes with the test.
  await pages.driver.executeScript(setNoValidate)
  return enterEmailAddressAndSubmit(emailAddress)
})

Then(/^I am shown the email address page$/, async function () {
  await pages.emailAddress.waitForPageLoad()
})

Then(/^I am informed that I must enter in a valid email address$/, async function () {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.emailAddress.getEmailAddressFieldErrorId(),
    pages.emailAddress.getEmailAddressLinkErrorCss(),
    'Enter an email address in the correct format, like name@example.com')
})

Then(/^I see the email address (.*) in the textbox$/, async function (emailAddress) {
  const enteredEmailAddress = await pages.emailAddress.getEmailAddressValue()
  expect(enteredEmailAddress).to.be.equal(emailAddress)
})

const setNoValidate = () => {
  const form = document.querySelectorAll('form')[0]
  form.setAttribute('novalidate', true)
}

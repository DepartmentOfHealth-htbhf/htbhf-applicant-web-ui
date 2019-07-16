const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { enterConfirmationCodeAndSubmit } = require('./common-steps')
const { assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-assertions')

When(/^I enter my confirmation code$/, async function () {
  await enterConfirmationCodeAndSubmit()
})

When(/^I do not enter a confirmation code$/, async function () {
  await enterConfirmationCodeAndSubmit('')
})

When(/^I enter in the wrong confirmation code$/, async function () {
  // confirmation code is always six digits
  const wrongCode = '1234567890'
  await enterConfirmationCodeAndSubmit(wrongCode)
})

Then(/^I am shown the enter code page$/, async function () {
  await pages.enterCode.waitForPageLoad()
})

Then(/^I am informed that I must enter in the code that was sent to me$/, async function () {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.enterCode.inputField.getInputErrorId(),
    pages.enterCode.inputField.getInputErrorLinkCss(),
    'Enter the 6 digit code we sent you')
})

Then(/^The request a new code link points to the send code page$/, async function () {
  const requestNewCodeLink = await pages.enterCode.getRequestNewCodeLink()
  const requestNewCodeLinkHref = await requestNewCodeLink.getAttribute('href')
  expect(requestNewCodeLinkHref).to.be.equal(pages.url + pages.sendCode.getPath())
})

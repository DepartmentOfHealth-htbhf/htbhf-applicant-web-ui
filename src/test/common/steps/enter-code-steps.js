const { When, Then } = require('cucumber')

const pages = require('./pages')
const { enterConfirmationCodeAndSubmit } = require('./common-steps')
const { assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-assertions')

When(/^I enter my confirmation code$/, async function () {
  // TODO DW HTBHF-1702 enter the code that was generated for this session
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
    pages.enterCode.getConfirmationCodeFieldErrorId(),
    pages.enterCode.getConfirmationCodeLinkErrorCss(),
    'Enter the 6 digit code we sent you')
})

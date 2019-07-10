const { When, Then } = require('cucumber')

const pages = require('./pages')
const { assertBackLinkPointsToPage } = require('./common-assertions')
const { enterConfirmationCodeAndSubmit } = require('./common-steps')
const { assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-assertions')

When(/^I enter my confirmation code$/, async function () {
  await enterConfirmationCodeAndSubmit()
})

When(/^I do not enter a confirmation code$/, async function () {
  await enterConfirmationCodeAndSubmit('')
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

Then(/^The back link points to the send code page$/, async function () {
  await assertBackLinkPointsToPage(pages.sendCode)
})

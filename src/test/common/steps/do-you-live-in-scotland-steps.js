const { When, Then } = require('cucumber')

const pages = require('./pages')
const { assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect, assertYesNoOptionsAreDisplayed } = require('./common-steps')

When(/^I select the No option on the do you live in scotland page$/, async function () {
  await pages.doYouLiveInScotland.selectNoRadioButton()
})

When(/^I select the Yes option on the do you live in scotland page$/, async function () {
  await pages.doYouLiveInScotland.selectYesRadioButton()
})

Then(/^I am shown the do you live in scotland page$/, async function () {
  await pages.doYouLiveInScotland.waitForPageLoad()
})

Then(/^I am informed that I need to select an option for do you live in scotland$/, async function () {
  await assertErrorHeaderTextPresent(pages.doYouLiveInScotland)
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.doYouLiveInScotland.getFieldErrorId(),
    pages.doYouLiveInScotland.getErrorLinkCss(),
    'Select yes or no')
})

Then(/^Yes and No options are displayed on the do you live in scotland page$/, async function () {
  await assertYesNoOptionsAreDisplayed(pages.doYouLiveInScotland)
})

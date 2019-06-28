const { When, Then } = require('cucumber')

const pages = require('./pages')
const { assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect, assertYesNoOptionsAreDisplayed } = require('./common-steps')

When(/^I say No to the do you live in Scotland question$/, async function () {
  await pages.doYouLiveInScotland.selectNoRadioButton()
})

When(/^I select the Yes option on the do you live in Scotland page$/, async function () {
  await pages.doYouLiveInScotland.selectYesRadioButton()
})

Then(/^I am shown the do you live in Scotland page$/, async function () {
  await pages.doYouLiveInScotland.waitForPageLoad()
})

Then(/^I am informed that I need to select an option for do you live in Scotland$/, async function () {
  await assertErrorHeaderTextPresent(pages.doYouLiveInScotland)
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.doYouLiveInScotland.getFieldErrorId(),
    pages.doYouLiveInScotland.getErrorLinkCss(),
    'Select yes if you live in Scotland')
})

Then(/^Yes and No options are displayed on the do you live in Scotland page$/, async function () {
  await assertYesNoOptionsAreDisplayed(pages.doYouLiveInScotland)
})

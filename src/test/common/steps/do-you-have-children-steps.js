const { When, Then } = require('cucumber')
const { assertBackLinkPointsToPage } = require('./common-assertions')

const pages = require('./pages')
const { assertFieldErrorAndLinkTextPresentAndCorrect, assertErrorHeaderTextPresent, assertYesNoOptionsAreDisplayed } = require('./common-assertions')

Then(/^I am shown the do you have children under four years old page$/, async function () {
  await pages.doYouHaveChildren.waitForPageLoad()
})

When(/^I say No to the do you have children under four years old question$/, async function () {
  await pages.doYouHaveChildren.selectNoRadioButton()
})

When(/^I say Yes to the do you have children under four years old question$/, async function () {
  await pages.doYouHaveChildren.selectYesRadioButton()
})

When(/^I have said No to the do you have children under four years old question$/, async function () {
  await pages.doYouHaveChildren.selectNoRadioButton()
  await pages.doYouHaveChildren.submitForm()
})

When(/^I have said Yes to the do you have children under four years old question$/, async function () {
  await pages.doYouHaveChildren.selectYesRadioButton()
  await pages.doYouHaveChildren.submitForm()
})

Then(/^I am informed that I need to select an option for do you have children under four years old$/, async function () {
  await assertErrorHeaderTextPresent(pages.doYouHaveChildren)
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.doYouHaveChildren.getFieldErrorId(),
    pages.doYouHaveChildren.getErrorLinkCss(),
    'Select yes if you have children who are under 4 years old')
})

Then(/^Yes and No options are displayed on the do you have children under four years old page$/, async function () {
  await assertYesNoOptionsAreDisplayed(pages.doYouHaveChildren)
})

Then(/^The back link points to the Do you have children under four years old page$/, async function () {
  await assertBackLinkPointsToPage(pages.doYouHaveChildren)
})

const { When, Then } = require('cucumber')

const pages = require('./pages')
const { assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect, assertYesNoOptionsAreDisplayed } = require('./common-steps')

Then(/^I am shown the do you have children three or younger page$/, async function () {
  await pages.doYouHaveChildrenThreeOrYounger.waitForPageLoad()
})

When(/^I say No to the do you have children three or younger question$/, async function () {
  await pages.doYouHaveChildrenThreeOrYounger.selectNoRadioButton()
})

When(/^I say Yes to the do you have children three or younger question$/, async function () {
  await pages.doYouHaveChildrenThreeOrYounger.selectYesRadioButton()
})

Then(/^I am informed that I need to select an option for do you have children three or younger$/, async function () {
  await assertErrorHeaderTextPresent(pages.doYouHaveChildrenThreeOrYounger)
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.doYouHaveChildrenThreeOrYounger.getFieldErrorId(),
    pages.doYouHaveChildrenThreeOrYounger.getErrorLinkCss(),
    'Select yes if you have any children who are three years old or younger')
})

Then(/^Yes and No options are displayed on the do you have children three or younger page$/, async function () {
  await assertYesNoOptionsAreDisplayed(pages.doYouHaveChildrenThreeOrYounger)
})

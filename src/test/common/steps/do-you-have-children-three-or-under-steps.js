const { When, Then } = require('cucumber')
const { assertBackLinkUrlIsEqualTo } = require('./common-assertions')

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

When(/^I have said No to the do you have children three or younger question$/, async function () {
  await pages.doYouHaveChildrenThreeOrYounger.selectNoRadioButton()
  await pages.doYouHaveChildrenThreeOrYounger.submitForm()
})

When(/^I have said Yes to the do you have children three or younger question$/, async function () {
  await pages.doYouHaveChildrenThreeOrYounger.selectYesRadioButton()
  await pages.doYouHaveChildrenThreeOrYounger.submitForm()
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

Then(/^The back link points to the Do you have any children who are three years old or younger page$/, async function () {
  await assertBackLinkUrlIsEqualTo(`${pages.url}${pages.doYouHaveChildrenThreeOrYounger.getPath()}`)
})

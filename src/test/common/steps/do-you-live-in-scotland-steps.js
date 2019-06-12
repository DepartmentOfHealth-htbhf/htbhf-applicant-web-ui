const { Then } = require('cucumber')

const pages = require('./pages')
const { assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-steps')

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

const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { enterDoYouLiveInScotlandNoAndSubmit, enterDateOfBirthAndSubmit } = require('./common-steps')

const WELSH_LANG_CODE = 'cy'

When('I have completed the first step of the application with Welsh language selected', async function () {
  await pages.scotland.open(pages.url, WELSH_LANG_CODE)
  await enterDoYouLiveInScotlandNoAndSubmit()
  await pages.dateOfBirth.waitForPageLoad(WELSH_LANG_CODE)
})

When(/^I successfully complete the next step$/, async function () {
  return enterDateOfBirthAndSubmit()
})

Then('the next page is displayed in Welsh', async function () {
  const language = await pages.dateOfBirth.getLangAttribute()
  expect(language).to.be.equal(WELSH_LANG_CODE)
})

Then('the next page continues to be displayed in Welsh', async function () {
  await pages.doYouHaveChildren.waitForPageLoad(WELSH_LANG_CODE)
  const language = await pages.doYouHaveChildren.getLangAttribute()
  expect(language).to.be.equal(WELSH_LANG_CODE)
})

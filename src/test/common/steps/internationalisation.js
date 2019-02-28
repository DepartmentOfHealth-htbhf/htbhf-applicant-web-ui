const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { enterNameAndSubmit } = require('./common-steps')

const WELSH_LANG_CODE = 'cy'

When('I have entered my details up to the enter national insurance page with Welsh language selected', async function () {
  await pages.enterName.open(pages.url, WELSH_LANG_CODE)
  await enterNameAndSubmit()
  await pages.enterNino.waitForPageLoad(WELSH_LANG_CODE)
})

Then('the enter national insurance page is in Welsh', async function () {
  const language = await pages.enterNino.getLangAttribute()
  expect(language).to.be.equal(WELSH_LANG_CODE)
})

Then('I am on the next page which is displayed in Welsh', async function () {
  await pages.enterDOB.waitForPageLoad(WELSH_LANG_CODE)
  const language = await pages.enterDOB.getLangAttribute()
  expect(language).to.be.equal(WELSH_LANG_CODE)
})

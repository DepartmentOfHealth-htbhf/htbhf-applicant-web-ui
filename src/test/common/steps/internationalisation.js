const { When, Then, Given } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')

const WELSH_LANG_CODE = 'cy'

When('I go to the enter national insurance number page with Welsh language selected', async function () {
  await pages.enterNino.open(pages.url, WELSH_LANG_CODE)
})

Then('the enter national insurance page is in Welsh', async function () {
  const language = await pages.enterNino.getLangAttribute()
  expect(language).to.be.equal(WELSH_LANG_CODE)
})

Given('I am on the enter national insurance number page with Welsh language selected', async function () {
  await pages.enterNino.open(pages.url, WELSH_LANG_CODE)
})

Then('I am on the next page which is displayed in Welsh', async function () {
  await pages.enterName.waitForPageLoad(WELSH_LANG_CODE)
  const language = await pages.enterName.getLangAttribute()
  expect(language).to.be.equal(WELSH_LANG_CODE)
})

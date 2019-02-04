const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { enterNinoAndSubmit, assertErrorHeaderTextPresent } = require('./common-steps')

const VALID_NINO = 'QQ123456C'

Given('I am on the enter national insurance number page', async function () {
  await pages.enterNino.open(pages.url)
})

When(/^I enter a valid national insurance number$/, async function () {
  return enterNinoAndSubmit(VALID_NINO)
})

When(/^I enter (.*) as my national insurance number$/, async function (nino) {
  return enterNinoAndSubmit(nino)
})

When(/^I do not enter a national insurance number$/, async function () {
  return enterNinoAndSubmit('')
})

Then(/^I am informed that the national insurance number is in the wrong format$/, async function () {
  await assertErrorHeaderTextPresent(pages.enterNino)
  const fieldErrorMessage = await pages.enterNino.getNinoFieldErrorText()
  const linkErrorMessage = await pages.enterNino.getNinoLinkErrorText()

  expect(fieldErrorMessage).to.be.equal('Enter a National Insurance number in the correct format')
  expect(linkErrorMessage).to.be.equal('Enter a National Insurance number in the correct format')
})

Then(/^I see the value (.*) in the textbox$/, async function (nino) {
  const enteredNino = await pages.enterNino.getNinoValue()
  expect(enteredNino).to.be.equal(nino)
})

Then(/^the enter date of birth page is shown$/, async function () {
  await pages.enterDOB.waitForPageLoad()
})

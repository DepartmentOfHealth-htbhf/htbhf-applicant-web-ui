const { Given, When, Then } = require('cucumber')
const { expect, assert } = require('chai')

const pages = require('./pages')

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
  await assertErrorHeaderTextPresent()
  const errorMessage = await pages.enterNino.getNinoError()
  expect(errorMessage).to.be.equal('Enter a National Insurance number in the correct format')
})

Then(/^I see the value (.*) in the textbox$/, async function (nino) {
  const enteredNino = await pages.enterNino.getNinoValue()
  expect(enteredNino).to.be.equal(nino)
})

Then(/^the enter date of birth page is shown$/, async function () {
  await pages.enterDOB.waitForPageLoad()
})

async function enterNinoAndSubmit (nino) {
  try {
    await pages.enterNino.enterNino(nino)
    await pages.enterNino.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the national insurance number and submit the page - ${error}`)
  }
}

async function assertErrorHeaderTextPresent () {
  try {
    await pages.enterNino.waitForPageLoad()
    const errorHeader = await pages.enterNino.getPageErrorHeaderText()
    expect(errorHeader).to.equal('There is a problem')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert error header text is present - ${error}`)
  }
}

const { Given, When, Then } = require('cucumber')
const { expect, assert } = require('chai')

const pages = require('./pages')
const { enterNameAndSubmit, assertErrorHeaderTextPresent, LONG_STRING, BLANK_STRING } = require('./common-steps')

Given('I am on the enter name page', async function () {
  await pages.enterName.open(pages.url)
})

When('I enter a first name which is too long', async function () {
  return enterNameAndSubmit(LONG_STRING, 'Bloggs')
})

When('I enter a last name which is too long', async function () {
  return enterNameAndSubmit('Joe', LONG_STRING)
})

When('I enter first name only', async function () {
  return enterNameAndSubmit('Joe', BLANK_STRING)
})

When(/^I enter (.*) and (.*) values$/, async function (firstName, lastName) {
  return enterNameAndSubmit(firstName, lastName)
})

Then('I am informed that the first name is too long', async function () {
  await assertErrorHeaderTextPresent(pages.enterName)
  const errorMessage = await pages.enterName.getFirstNameError()
  expect(errorMessage).to.be.equal('Enter a shorter first or given name')
})

Then(/^I see the invalid first name I entered in the textbox$/, async function () {
  const enteredFirstName = await pages.enterName.getFirstNameValue()
  expect(enteredFirstName).to.be.equal(LONG_STRING)
})

Then(/^I see the last name I entered in the textbox$/, async function () {
  const enteredFirstName = await pages.enterName.getLastNameValue()
  expect(enteredFirstName).to.be.equal(LONG_STRING)
})

Then('I am informed that the last name is too long', async function () {
  await assertErrorHeaderTextPresent(pages.enterName)
  await assertLastNameErrorPresent('Enter a shorter last or family name')
})

Then('I am informed that a last name is required', async function () {
  await assertErrorHeaderTextPresent(pages.enterName)
  await assertLastNameErrorPresent('Enter your last or family name')
})

Then('I am shown the enter national insurance page', async function () {
  await pages.enterNino.waitForPageLoad()
})

async function assertLastNameErrorPresent (expectedErrorMessage) {
  try {
    const errorMessage = await pages.enterName.getLastNameError()
    expect(errorMessage).to.be.equal(expectedErrorMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert last name error message is present - ${error}`)
  }
}

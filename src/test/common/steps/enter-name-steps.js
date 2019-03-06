const { When, Then } = require('cucumber')
const { expect, assert } = require('chai')

const pages = require('./pages')
const { enterNameAndSubmit, assertErrorHeaderTextPresent } = require('./common-steps')
const { LONG_STRING, BLANK_STRING } = require('./constants')

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
  await assertFirstNameErrorFieldAndLink('Enter a shorter first or given name')
})

Then(/^I see the invalid first name I entered in the textbox$/, async function () {
  const enteredFirstName = await pages.enterName.getFirstNameValue()
  expect(enteredFirstName).to.be.equal(LONG_STRING)
})

Then(/^I see the last name I entered in the textbox$/, async function () {
  const enteredLastName = await pages.enterName.getLastNameValue()
  expect(enteredLastName).to.be.equal(LONG_STRING)
})

Then('I am informed that the last name is too long', async function () {
  await assertErrorHeaderTextPresent(pages.enterName)
  await assertLastNameErrorFieldAndLink('Enter a shorter last or family name')
})

Then('I am informed that a last name is required', async function () {
  await assertErrorHeaderTextPresent(pages.enterName)
  await assertLastNameErrorFieldAndLink('Enter your last or family name')
})

Then(/^I am shown the enter name page$/, async function () {
  await pages.enterName.waitForPageLoad()
})

async function assertFirstNameErrorFieldAndLink (expectedErrorMessage) {
  try {
    const errorFieldText = await pages.enterName.getFirstNameErrorFieldText()
    const errorLinkText = await pages.enterName.getFirstNameErrorLinkText()

    expect(errorFieldText).to.be.equal(expectedErrorMessage)
    expect(errorLinkText).to.be.equal(expectedErrorMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert first name error message is present - ${error}`)
  }
}

async function assertLastNameErrorFieldAndLink (expectedErrorMessage) {
  try {
    const errorFieldText = await pages.enterName.getLastNameErrorFieldText()
    const errorLinkText = await pages.enterName.getLastNameErrorLinkText()

    expect(errorFieldText).to.be.equal(expectedErrorMessage)
    expect(errorLinkText).to.be.equal(expectedErrorMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert last name error message is present - ${error}`)
  }
}

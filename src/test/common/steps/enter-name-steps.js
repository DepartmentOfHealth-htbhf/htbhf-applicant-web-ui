const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { enterNameAndSubmit, assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-steps')
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
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.enterName.getFirstNameErrorFieldId(),
    pages.enterName.getFirstNameErrorLinkCss(),
    expectedErrorMessage)
}

async function assertLastNameErrorFieldAndLink (expectedErrorMessage) {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.enterName.getLastNameErrorFieldId(),
    pages.enterName.getLastNameErrorLinkCss(),
    expectedErrorMessage)
}

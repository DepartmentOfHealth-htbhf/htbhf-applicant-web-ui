/* eslint-disable no-unused-expressions */
const { When, Then } = require('cucumber')
const { expect, assert } = require('chai')
const Promise = require('bluebird')

const { assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect, assertYesNoOptionsAreDisplayed } = require('./common-assertions')

const pages = require('./pages')

When(/^I say No to the are you pregnant question$/, async function () {
  await pages.areYouPregnant.selectNoRadioButton()
})

When(/^I say Yes to the are you pregnant question$/, async function () {
  await pages.areYouPregnant.selectYesRadioButton()
})

When(/^I enter a valid expected delivery date$/, async function () {
  await pages.areYouPregnant.enterValidExpectedDeliveryDate()
})

When(/^I enter text in the expected delivery date fields$/, async function () {
  await pages.areYouPregnant.setExpectedDeliveryDate('foo', 'bar', 'baz!')
})

When(/^I enter my expected delivery date too far in the past$/, async function () {
  await pages.areYouPregnant.enterExpectedDeliveryDateTooFarInThePast()
})

When(/^I enter my expected delivery date too far in the future$/, async function () {
  await pages.areYouPregnant.enterExpectedDeliveryDateTooFarInTheFuture()
})

Then(/^No option is selected$/, async function () {
  const radioButtons = await pages.areYouPregnant.getRadioButtons()
  expect(radioButtons.length).to.be.equal(2)

  const checkedRadioButtons = await Promise.filter(radioButtons, async (radio) => {
    const checked = await radio.getAttribute('checked')
    return checked !== null
  })

  expect(checkedRadioButtons.length).to.be.equal(0)
})

Then(/^Yes and No options are displayed on the are you pregnant page$/, async function () {
  await assertYesNoOptionsAreDisplayed(pages.areYouPregnant)
})

Then(/^expected date of delivery instructional text is displayed$/, async function () {
  try {
    const text = await pages.areYouPregnant.getExpectedDeliveryDateInstructionalText()
    assert(text.getText().toString().trim().length > 0, 'expected delivery date instructional text should not be empty')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert expected date of delivery instructional text is displayed - ${error}`)
  }
})

Then(/^no values are present in the expected delivery date fields$/, async function () {
  try {
    const dayValue = await pages.areYouPregnant.dayInputField.getValue()
    assert(dayValue.length === 0, 'expected delivery date day to be empty')

    const monthValue = await pages.areYouPregnant.monthInputField.getValue()
    assert(monthValue.length === 0, 'expected delivery date month to be empty')

    const yearValue = await pages.areYouPregnant.yearInputField.getValue()
    assert(yearValue.length === 0, 'expected delivery date year to be empty')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert no values are present in the expected delivery date fields - ${error}`)
  }
})

Then(/^I am shown the are you pregnant page$/, async function () {
  await pages.areYouPregnant.waitForPageLoad()
})

Then(/^I am informed that I need to select an option for are you pregnant$/, async function () {
  await assertErrorHeaderTextPresent(pages.areYouPregnant)
  await assertAreYouPregnantErrorPresent()
})

Then(/^I am informed that I need to enter an expected delivery date$/, async function () {
  await assertErrorHeaderTextPresent(pages.areYouPregnant)
  await assertExpectedDeliveryDateErrorPresent('Enter the due date')
})

Then(/^I am informed that the date is too far in the past$/, async function () {
  await assertErrorHeaderTextPresent(pages.areYouPregnant, 'There’s a problem')
  await assertExpectedDeliveryDateErrorPresent('Enter a due date to show you’re at least 10 weeks pregnant')
})

Then(/^I am informed that the date is too far in the future$/, async function () {
  await assertErrorHeaderTextPresent(pages.areYouPregnant, 'There’s a problem')
  await assertExpectedDeliveryDateErrorPresent('Enter a due date to show you’re at least 10 weeks pregnant')
})

async function assertAreYouPregnantErrorPresent () {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.areYouPregnant.getAreYouPregnantFieldErrorId(),
    pages.areYouPregnant.getAreYouPregnantErrorLinkCss(),
    'Select yes if you’re pregnant')
}

async function assertExpectedDeliveryDateErrorPresent (expectedErrorMessage) {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.areYouPregnant.getExpectedDeliveryDateFieldErrorId(),
    pages.areYouPregnant.getExpectedDeliveryDateErrorLinkCss(),
    expectedErrorMessage)
}

/* eslint-disable no-unused-expressions */
const { Given, When, Then } = require('cucumber')
const { expect, assert } = require('chai')

const { assertErrorHeaderTextPresent } = require('./common-steps')

const pages = require('./pages')
const YES = 'yes'
const NO = 'no'

Given(/^I am on the are you pregnant page$/, async function () {
  await pages.areYouPregnant.open(pages.url)
})

When(/^I select the no option$/, async function () {
  await pages.areYouPregnant.selectRadioButton(NO)
  await pages.areYouPregnant.submitForm()
})

When(/^I select the yes option$/, async function () {
  await pages.areYouPregnant.selectRadioButton(YES)
})

When(/^I enter my expected due date in six months time$/, async function () {
  await pages.areYouPregnant.enterExpectedDeliveryDateInSixMonths()
  await pages.areYouPregnant.submitForm()
})

When(/^I enter text in the due date fields$/, async function () {
  await pages.areYouPregnant.enterTextInDeliveryDateFields()
})

When(/^I do not select an option$/, async function () {
  await pages.areYouPregnant.submitForm()
})

Then(/^No option is selected$/, async function () {
  const radioButtons = await pages.areYouPregnant.getRadioButtons()

  expect(radioButtons.length).to.be.equal(2)
  radioButtons.forEach(function (radioButton) {
    const checked = radioButton.getAttribute('checked')
    expect(Object.keys(checked).length).to.equal(0)
  })
})

Then(/^Yes and No options are displayed$/, async function () {
  await pages.areYouPregnant.getRadioLabelWithText(YES)
  await pages.areYouPregnant.getRadioLabelWithText(NO)
})

Then(/^Expected date of delivery instructional text is displayed$/, async function () {
  const text = await pages.areYouPregnant.getExpectedDeliveryDateInstructionalText()
  assert(text.getText().toString().trim().length, 'expected delivery date instructional text should not be empty')
})

Then(/^No values are present in the expected delivery date fields$/, async function () {
  const day = await pages.areYouPregnant.getExpectedDeliveryDateDayInput()
  const dayValue = await day.getAttribute('value')
  assert(dayValue.length === 0, 'expected delivery date day to be empty')
  const month = await pages.areYouPregnant.getExpectedDeliveryDateMonthInput()
  const monthValue = await month.getAttribute('value')
  assert(monthValue.length === 0, 'expected delivery date month to be empty')
  const year = await pages.areYouPregnant.getExpectedDeliveryDateYearInput()
  const yearValue = await year.getAttribute('value')
  assert(yearValue.length === 0, 'expected delivery date year to be empty')
})

Then(/^I am shown the card address page$/, async function () {
  await pages.cardAddress.waitForPageLoad()
})

Then(/^I am informed that I need to select an option$/, async function () {
  await assertErrorHeaderTextPresent(pages.areYouPregnant)
  await assertAreYouPregnantErrorPresent()
})

Then(/^I am informed that I need to enter an expected delivery date$/, async function () {
  await assertErrorHeaderTextPresent(pages.areYouPregnant)
  await assertExpectedDeliveryDateErrorPresent('Enter your baby\'s due date')
})

async function assertAreYouPregnantErrorPresent () {
  try {
    const error = await pages.areYouPregnant.getAreYouPregnantErrorText()
    expect(error).to.be.equal('Select yes or no')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert are you pregnant error message is present - ${error}`)
  }
}

async function assertExpectedDeliveryDateErrorPresent (expectedMessage) {
  try {
    const error = await pages.areYouPregnant.getExpectedDeliveryDateErrorText()
    expect(error).to.be.equal(expectedMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert expected delivery date error message is present - ${error}`)
  }
}

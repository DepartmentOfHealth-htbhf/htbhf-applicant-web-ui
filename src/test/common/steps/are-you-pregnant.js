/* eslint-disable no-unused-expressions */
const { When, Then } = require('cucumber')
const { expect, assert } = require('chai')
const Promise = require('bluebird')
const { YES_LABEL, NO_LABEL } = require('./constants')

const { assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-steps')

const pages = require('./pages')

When(/^I select the No option$/, async function () {
  await pages.areYouPregnant.selectNoRadioButton()
})

When(/^I select the Yes option$/, async function () {
  await pages.areYouPregnant.selectYesRadioButton()
})

When(/^I enter a valid expected delivery date$/, async function () {
  await pages.areYouPregnant.enterValidExpectedDeliveryDate()
})

When(/^I enter text in the expected delivery date fields$/, async function () {
  await pages.areYouPregnant.enterTextInDeliveryDateFields()
})

When(/^I do not select an option$/, function () {
  // Specifically does nothing
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

Then(/^Yes and No options are displayed$/, async function () {
  const labels = await pages.areYouPregnant.getAllRadioLabels()
  const text = await Promise.all(labels.map(async (label) => label.getText()))

  expect(text).to.include(YES_LABEL)
  expect(text).to.include(NO_LABEL)
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
    const day = await pages.areYouPregnant.getExpectedDeliveryDateDayInput()
    const dayValue = await day.getAttribute('value')
    assert(dayValue.length === 0, 'expected delivery date day to be empty')

    const month = await pages.areYouPregnant.getExpectedDeliveryDateMonthInput()
    const monthValue = await month.getAttribute('value')
    assert(monthValue.length === 0, 'expected delivery date month to be empty')

    const year = await pages.areYouPregnant.getExpectedDeliveryDateYearInput()
    const yearValue = await year.getAttribute('value')
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
  await assertExpectedDeliveryDateErrorPresent('Enter your baby\'s due date')
})

Then(/^I am informed that the date is too far in the past$/, async function () {
  await assertErrorHeaderTextPresent(pages.areYouPregnant, 'The due date you entered is more than 1 month ago')
  await assertExpectedDeliveryDateErrorPresent('Please call our helpline on 0345 607 6823 to talk about your application.')
})

Then(/^I am informed that the date is too far in the future$/, async function () {
  await assertErrorHeaderTextPresent(pages.areYouPregnant, 'The date you have entered is more than 8 months in the future. You must be at least 10 weeks pregnant to apply for yourself.')
  await assertExpectedDeliveryDateErrorPresent('If you have children under the age of 4, answer ‘no’ to this question to continue with this application on their behalf.')
})

async function assertAreYouPregnantErrorPresent (expectedErrorMessage = 'Select yes or no') {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.areYouPregnant.getAreYouPregnantFieldErrorId(),
    pages.areYouPregnant.getAreYouPregnantErrorLinkCss(),
    expectedErrorMessage)
}

async function assertExpectedDeliveryDateErrorPresent (expectedErrorMessage) {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.areYouPregnant.getExpectedDeliveryDateFieldErrorId(),
    pages.areYouPregnant.getExpectedDeliveryDateErrorLinkCss(),
    expectedErrorMessage)
}

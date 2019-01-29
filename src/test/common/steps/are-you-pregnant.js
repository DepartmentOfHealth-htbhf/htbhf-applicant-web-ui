/* eslint-disable no-unused-expressions */
const { Given, When, Then } = require('cucumber')
const { expect, assert } = require('chai')

const { assertErrorHeaderTextPresent } = require('./common-steps')

const pages = require('./pages')

Given(/^I am on the are you pregnant page$/, async function () {
  await pages.areYouPregnant.open(pages.url)
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
  await pages.areYouPregnant.getRadioLabelWithText('yes')
  await pages.areYouPregnant.getRadioLabelWithText('no')
})

When(/^I select the no option$/, async function () {
  await pages.areYouPregnant.selectRadioButton('no')
  await pages.areYouPregnant.submitForm()
})

When(/^I select the yes option$/, async function () {
  await pages.areYouPregnant.selectRadioButton('yes')
})

When(/^I enter my expected due date in six months time$/, async function () {
  await pages.areYouPregnant.enterExpectedDeliveryDateInSixMonths()
  await pages.areYouPregnant.submitForm()
})

Then(/^I am shown the card address page$/, async function () {
  await pages.cardAddress.waitForPageLoad()
})

When(/^I do not select an option$/, async function () {
  await pages.areYouPregnant.submitForm()
})

Then(/^I am informed that I need to select an option$/, async function () {
  await assertErrorHeaderTextPresent(pages.areYouPregnant)
  await assertAreYouPregnantErrorPresent()
})

async function assertAreYouPregnantErrorPresent () {
  try {
    const error = await pages.areYouPregnant.getAreYouPregnantErrorText()
    expect(error).to.be.equal('Select yes or no')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert date of birth error message is present - ${error}`)
  }
}

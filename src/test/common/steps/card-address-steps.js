const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { enterCardAddressAndSubmit, assertErrorHeaderTextPresent } = require('./common-steps')
const { LONG_STRING, BLANK_STRING } = require('./constants')

const VALID_ADDRESS_LINE_1 = 'Flat b'
const VALID_ADDRESS_LINE_2 = '221 Baker street'
const VALID_TOWN_OR_CITY = 'London'
const VALID_POSTCODE = 'AA1 1AA'

When(/^I enter an address with postcode (.*)$/, async function (postcode) {
  await enterCardAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, postcode)
})

When(/^I do not enter the first line of an address$/, async function () {
  await enterCardAddressAndSubmit(BLANK_STRING, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/I do not enter the 'town or city' of an address$/, async function () {
  await enterCardAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, BLANK_STRING, VALID_POSTCODE)
})

When(/^I enter in an address where the first line is too long$/, async function () {
  await enterCardAddressAndSubmit(LONG_STRING, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/^I enter in an address where the second line is too long$/, async function () {
  await enterCardAddressAndSubmit(VALID_ADDRESS_LINE_1, LONG_STRING, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/^I enter in an address where the 'town or city' is too long$/, async function () {
  await enterCardAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, LONG_STRING, VALID_POSTCODE)
})

When(/^I do not enter the second line of an address$/, async function () {
  await enterCardAddressAndSubmit(VALID_ADDRESS_LINE_1, BLANK_STRING, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/^I do not enter in any address fields$/, async function () {
  await enterCardAddressAndSubmit(BLANK_STRING, BLANK_STRING, BLANK_STRING, BLANK_STRING)
})

Then(/^I am shown the card address page$/, async function () {
  await pages.cardAddress.waitForPageLoad()
})

Then(/^I am informed that the postcode is in the wrong format$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  await assertPostcodeErrorFieldAndLink('Enter a correct postcode, like AA1 1AA')
})

Then(/^I am informed that I need to enter an address on the 'address line 1' field$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  await assertAddressLine1ErrorFieldAndLink('Tell us your address')
})

Then(/^I am informed that I need to enter an address on the 'town or city' field$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  await assertTownOrCityErrorFieldAndLink('Tell us your address')
})

Then(/^I am informed that the first line of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  await assertAddressLine1ErrorFieldAndLink('The information you entered is too long')
})

Then(/^I am informed that the second line of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  await assertAddressLine2ErrorFieldAndLink('The information you entered is too long')
})

Then(/^I am informed that the 'town or city' of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  await assertTownOrCityErrorFieldAndLink('The information you entered is too long')
})

Then(/^I am informed that I need to enter an address on the 'address line 1', 'address line 2' and 'town or city' fields$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  await assertAddressLine1ErrorFieldAndLink('Tell us your address')
  await assertTownOrCityErrorFieldAndLink('Tell us your address')
  await assertPostcodeErrorFieldAndLink('Enter a correct postcode, like AA1 1AA')
})

const assertAddressLine1ErrorFieldAndLink = async (message) => {
  const errorFieldText = await pages.cardAddress.getAddressLine1FieldErrorText()
  const errorLinkText = await pages.cardAddress.getAddressLine1ErrorLinkText()

  expect(errorFieldText).to.be.equal(message)
  expect(errorLinkText).to.be.equal(message)
}

const assertAddressLine2ErrorFieldAndLink = async (message) => {
  const errorFieldText = await pages.cardAddress.getAddressLine2FieldErrorText()
  const errorLinkText = await pages.cardAddress.getAddressLine2ErrorLinkText()

  expect(errorFieldText).to.be.equal(message)
  expect(errorLinkText).to.be.equal(message)
}

const assertTownOrCityErrorFieldAndLink = async (message) => {
  const errorFieldText = await pages.cardAddress.getTownOrCityFieldErrorText()
  const errorLinkText = await pages.cardAddress.getTownOrCityErrorLinkText()

  expect(errorFieldText).to.be.equal(message)
  expect(errorLinkText).to.be.equal(message)
}

const assertPostcodeErrorFieldAndLink = async (message) => {
  const errorFieldText = await pages.cardAddress.getPostcodeFieldErrorText()
  const errorLinkText = await pages.cardAddress.getPostcodeErrorLinkText()

  expect(errorFieldText).to.be.equal(message)
  expect(errorLinkText).to.be.equal(message)
}

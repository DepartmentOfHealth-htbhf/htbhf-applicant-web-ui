const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { enterCardAddress, assertErrorHeaderTextPresent } = require('./common-steps')
const { LONG_STRING, BLANK_STRING } = require('./constants')

const VALID_ADDRESS_LINE_1 = 'Flat b'
const VALID_ADDRESS_LINE_2 = '221 Baker street'
const VALID_TOWN_OR_CITY = 'London'
const VALID_POSTCODE = 'AA1 1AA'

Given(/^I am on the card address page$/, async function () {
  await pages.cardAddress.open(pages.url)
})

When(/^I enter an address with postcode (.*)$/, async function (postcode) {
  await enterCardAddress(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, postcode)
})

When(/^I do not enter the first line of an address$/, async function () {
  await enterCardAddress(BLANK_STRING, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/I do not enter the 'town or city' of an address$/, async function () {
  await enterCardAddress(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, BLANK_STRING, VALID_POSTCODE)
})

When(/^I enter in an address where the first line is too long$/, async function () {
  await enterCardAddress(LONG_STRING, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/^I enter in an address where the second line is too long$/, async function () {
  await enterCardAddress(VALID_ADDRESS_LINE_1, LONG_STRING, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/^I enter in an address where the 'town or city' is too long$/, async function () {
  await enterCardAddress(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, LONG_STRING, VALID_POSTCODE)
})

When(/^I do not enter the second line of an address$/, async function () {
  await enterCardAddress(VALID_ADDRESS_LINE_1, BLANK_STRING, VALID_TOWN_OR_CITY, VALID_POSTCODE)
})

When(/^I do not enter in any address fields$/, async function () {
  await enterCardAddress(BLANK_STRING, BLANK_STRING, BLANK_STRING, BLANK_STRING)
})

Then(/^I am informed that the postcode is in the wrong format$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  const errorMessage = await pages.cardAddress.getPostcodesError()
  expect(errorMessage).to.be.equal('Enter a correct postcode, like AA1 1AA')
})

Then(/^I am informed that I need to enter an address on the 'address line 1' field$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  const errorMessage = await pages.cardAddress.getAddressLine1Error()
  expect(errorMessage).to.be.equal('Tell us your address')
})

Then(/^I am informed that I need to enter an address on the 'town or city' field$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  const errorMessage = await pages.cardAddress.getTownOrCityError()
  expect(errorMessage).to.be.equal('Tell us your address')
})

Then(/^I am informed that the first line of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  const errorMessage = await pages.cardAddress.getAddressLine1Error()
  expect(errorMessage).to.be.equal('The information you entered is too long')
})

Then(/^I am informed that the second line of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  const errorMessage = await pages.cardAddress.getAddressLine2Error()
  expect(errorMessage).to.be.equal('The information you entered is too long')
})

Then(/^I am informed that the 'town or city' of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  const errorMessage = await pages.cardAddress.getTownOrCityError()
  expect(errorMessage).to.be.equal('The information you entered is too long')
})

Then(/^I am informed that I need to enter an address on the 'address line 1', 'address line 2' and 'town or city' fields$/, async function () {
  await assertErrorHeaderTextPresent(pages.cardAddress)
  const addressLine1Error = await pages.cardAddress.getAddressLine1Error()
  const townOrCityError = await pages.cardAddress.getTownOrCityError()
  const postcodeError = await pages.cardAddress.getPostcodesError()

  expect(addressLine1Error).to.be.equal('Tell us your address')
  expect(townOrCityError).to.be.equal('Tell us your address')
  expect(postcodeError).to.be.equal('Enter a correct postcode, like AA1 1AA')
})

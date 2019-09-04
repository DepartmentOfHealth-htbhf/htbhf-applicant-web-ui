const { When, Then } = require('cucumber')

const pages = require('./pages')
const { enterManualAddressAndSubmit } = require('./common-steps')
const { assertFieldErrorAndLinkTextPresentAndCorrect, assertErrorHeaderTextPresent } = require('./common-assertions')
const { LONG_STRING, BLANK_STRING } = require('./constants')

const VALID_ADDRESS_LINE_1 = 'Flat b'
const VALID_ADDRESS_LINE_2 = '221 Baker street'
const VALID_TOWN_OR_CITY = 'London'
const VALID_COUNTY = 'Greater London'
const VALID_POSTCODE = 'AA1 1AA'

When(/^I enter an address with postcode (.*)$/, async function (postcode) {
  await enterManualAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, VALID_COUNTY, postcode)
})

When(/^I do not enter the first line of an address$/, async function () {
  await enterManualAddressAndSubmit(BLANK_STRING, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, VALID_COUNTY, VALID_POSTCODE)
})

When(/I do not enter the 'town or city' of an address$/, async function () {
  await enterManualAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, BLANK_STRING, VALID_COUNTY, VALID_POSTCODE)
})

When(/I do not enter the 'county' of an address$/, async function () {
  await enterManualAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, BLANK_STRING, VALID_POSTCODE)
})

When(/^I enter in an address where the first line is too long$/, async function () {
  await enterManualAddressAndSubmit(LONG_STRING, VALID_ADDRESS_LINE_2, VALID_TOWN_OR_CITY, VALID_COUNTY, VALID_POSTCODE)
})

When(/^I enter in an address where the second line is too long$/, async function () {
  await enterManualAddressAndSubmit(VALID_ADDRESS_LINE_1, LONG_STRING, VALID_TOWN_OR_CITY, VALID_COUNTY, VALID_POSTCODE)
})

When(/^I enter in an address where the 'town or city' is too long$/, async function () {
  await enterManualAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, LONG_STRING, VALID_COUNTY, VALID_POSTCODE)
})

When(/^I enter in an address where the 'county' is too long$/, async function () {
  await enterManualAddressAndSubmit(VALID_ADDRESS_LINE_1, VALID_ADDRESS_LINE_2, LONG_STRING, LONG_STRING, VALID_POSTCODE)
})

When(/^I do not enter the second line of an address$/, async function () {
  await enterManualAddressAndSubmit(VALID_ADDRESS_LINE_1, BLANK_STRING, VALID_TOWN_OR_CITY, VALID_COUNTY, VALID_POSTCODE)
})

When(/^I do not enter in any address fields$/, async function () {
  await enterManualAddressAndSubmit(BLANK_STRING, BLANK_STRING, BLANK_STRING, BLANK_STRING, BLANK_STRING)
})

Then(/^I am shown the manual address page$/, async function () {
  await pages.manualAddress.waitForPageLoad()
})

Then(/^I am informed that the postcode is in the wrong format$/, async function () {
  await assertErrorHeaderTextPresent(pages.manualAddress)
  await assertPostcodeErrorFieldAndLink('Enter a correct postcode, like AA1 1AA')
})

Then(/^I am informed that I need to enter an address on the 'address line 1' field$/, async function () {
  await assertErrorHeaderTextPresent(pages.manualAddress)
  await assertAddressLine1ErrorFieldAndLink('Enter a building and street')
})

Then(/^I am informed that I need to enter an address on the 'town or city' field$/, async function () {
  await assertErrorHeaderTextPresent(pages.manualAddress)
  await assertTownOrCityErrorFieldAndLink('Enter a town or city')
})

Then(/^I am informed that the first line of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.manualAddress)
  await assertAddressLine1ErrorFieldAndLink('The information you entered is too long')
})

Then(/^I am informed that the second line of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.manualAddress)
  await assertAddressLine2ErrorFieldAndLink('The information you entered is too long')
})

Then(/^I am informed that the 'town or city' of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.manualAddress)
  await assertTownOrCityErrorFieldAndLink('The information you entered is too long')
})

Then(/^I am informed that the 'county' of the address is too long$/, async function () {
  await assertErrorHeaderTextPresent(pages.manualAddress)
  await assertCountyErrorFieldAndLink('The information you entered is too long')
})

Then(/^I am informed that I need to enter an address on the 'address line 1', 'town or city' and 'postcode' fields$/, async function () {
  await assertErrorHeaderTextPresent(pages.manualAddress)
  await assertAddressLine1ErrorFieldAndLink('Enter a building and street')
  await assertTownOrCityErrorFieldAndLink('Enter a town or city')
  await assertPostcodeErrorFieldAndLink('Enter a correct postcode, like AA1 1AA')
})

const assertAddressLine1ErrorFieldAndLink = async (expectedErrorMessage) => {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.manualAddress.line1InputField.getInputErrorId(),
    pages.manualAddress.line1InputField.getInputErrorLinkCss(),
    expectedErrorMessage)
}

const assertAddressLine2ErrorFieldAndLink = async (expectedErrorMessage) => {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.manualAddress.line2InputField.getInputErrorId(),
    pages.manualAddress.line2InputField.getInputErrorLinkCss(),
    expectedErrorMessage)
}

const assertTownOrCityErrorFieldAndLink = async (expectedErrorMessage) => {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.manualAddress.townOrCityInputField.getInputErrorId(),
    pages.manualAddress.townOrCityInputField.getInputErrorLinkCss(),
    expectedErrorMessage)
}

const assertCountyErrorFieldAndLink = async (expectedErrorMessage) => {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.manualAddress.countyField.getInputErrorId(),
    pages.manualAddress.countyField.getInputErrorLinkCss(),
    expectedErrorMessage)
}

const assertPostcodeErrorFieldAndLink = async (expectedErrorMessage) => {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.manualAddress.postcodeInputField.getInputErrorId(),
    pages.manualAddress.postcodeInputField.getInputErrorLinkCss(),
    expectedErrorMessage)
}

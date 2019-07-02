const { expect, assert } = require('chai')
const { When } = require('cucumber')
const { path } = require('ramda')

const pages = require('./pages')
const { setupSuccessfulWiremockClaimMappingWithStatus, deleteAllWiremockMappings, setupSuccessfulWiremockUpdatedClaimMapping, getOutboundRequestsToUrl } = require('../wiremock')
const TESTS = process.env.TESTS
const COMPATIBILITY_TESTS = 'compatibility'
const INTEGRATION_TESTS = 'integration'

const testsRequireApiMocks = () => TESTS !== COMPATIBILITY_TESTS && TESTS !== INTEGRATION_TESTS

const {
  VALID_ELIGIBLE_NINO,
  FIRST_NAME,
  LAST_NAME,
  DAY,
  MONTH,
  YEAR,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  TOWN,
  POSTCODE,
  CLAIMS_ENDPOINT,
  PHONE_NUMBER,
  YES_LABEL,
  NO_LABEL,
  EMAIL_ADDRESS,
  CONFIRMATION_CODE
} = require('./constants')

async function enterDoYouLiveInScotlandNoAndSubmit () {
  try {
    await pages.doYouLiveInScotland.selectNoRadioButton()
    await pages.doYouLiveInScotland.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select No on the Do You Live In Scotland page and submit - ${error}`)
  }
}

async function enterNameAndSubmit (firstName = FIRST_NAME, lastName = LAST_NAME) {
  try {
    await pages.enterName.enterFirstName(firstName)
    await pages.enterName.enterLastName(lastName)
    await pages.enterName.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the name and submit the page - ${error}`)
  }
}

async function enterNinoAndSubmit (nino = VALID_ELIGIBLE_NINO) {
  try {
    await pages.enterNino.enterNino(nino)
    await pages.enterNino.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the national insurance number and submit the page - ${error}`)
  }
}

async function enterDateOfBirthAndSubmit (day = DAY, month = MONTH, year = YEAR) {
  try {
    await pages.enterDOB.enterDay(day)
    await pages.enterDOB.enterMonth(month)
    await pages.enterDOB.enterYear(year)
    await pages.enterDOB.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the date of birth and submit the page - ${error}`)
  }
}

async function selectYesOnPregnancyPage () {
  try {
    await pages.areYouPregnant.selectYesRadioButton()
    await pages.areYouPregnant.enterValidExpectedDeliveryDate()
    await pages.areYouPregnant.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'Yes' for 'Are you pregnant?' and submit the page - ${error}`)
  }
}

async function selectNoOnPregnancyPage () {
  try {
    await pages.areYouPregnant.selectNoRadioButton()
    await pages.areYouPregnant.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'No' for 'Are you pregnant?' and submit the page - ${error}`)
  }
}

async function enterCardAddressAndSubmit (addressLine1 = ADDRESS_LINE_1, addressLine2 = ADDRESS_LINE_2, townOrCity = TOWN, postcode = POSTCODE) {
  try {
    await pages.cardAddress.enterAddressLine1(addressLine1)
    await pages.cardAddress.enterAddressLine2(addressLine2)
    await pages.cardAddress.enterTownOrCity(townOrCity)
    await pages.cardAddress.enterPostcode(postcode)
    await pages.cardAddress.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter card address and submit the page - ${error}`)
  }
}

async function enterPhoneNumberAndSubmit (phoneNumber = PHONE_NUMBER) {
  try {
    await pages.phoneNumber.enterPhoneNumber(phoneNumber)
    await pages.phoneNumber.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter phone number and submit the page - ${error}`)
  }
}

async function enterEmailAddressAndSubmit (emailAddress = EMAIL_ADDRESS) {
  try {
    await pages.emailAddress.enterEmailAddress(emailAddress)
    await pages.emailAddress.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter phone number and submit the page - ${error}`)
  }
}

async function selectNoOnChildrenThreeOrYoungerPage () {
  try {
    await pages.doYouHaveChildrenThreeOrYounger.selectNoRadioButton()
    await pages.doYouHaveChildrenThreeOrYounger.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'No' for 'Do you have any children three or younger?' and submit the page - ${error}`)
  }
}

async function selectTextOnSendCode () {
  try {
    await pages.sendCode.selectTextRadioButton()
    await pages.sendCode.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'Text' for 'We’re sending you a code' and submit the page - ${error}`)
  }
}

async function enterConfirmationCodeAndSubmit (confirmationCode = CONFIRMATION_CODE) {
  try {
    await pages.enterCode.enterConfirmationCode(confirmationCode)
    await pages.enterCode.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter confirmation code for 'Enter code' and submit the page - ${error}`)
  }
}

async function assertErrorHeaderTextPresent (page, message = `There’s a problem`) {
  try {
    await page.waitForPageLoad()
    const errorHeader = await page.getPageErrorHeaderText()
    expect(errorHeader).to.equal(message)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert error header text is present - ${error}`)
  }
}

async function assertFieldErrorAndLinkTextPresentAndCorrect (fieldErrorId, errorLinkCss, expectedErrorMessage) {
  try {
    const fieldError = await pages.genericPage.findById(fieldErrorId)
    const fieldErrorText = await pages.genericPage.getVisibleTextFromFieldError(fieldError)

    const errorLink = await pages.genericPage.findByCSS(errorLinkCss)
    const errorLinkText = await errorLink.getText()

    expect(fieldErrorText).to.be.equal(expectedErrorMessage)
    expect(errorLinkText).to.be.equal(expectedErrorMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert field error is present - ${error}`)
  }
}

async function completeTheApplicationAsAPregnantWoman () {
  await enterDoYouLiveInScotlandNoAndSubmit()
  await enterDateOfBirthAndSubmit()
  await selectNoOnChildrenThreeOrYoungerPage()
  await selectYesOnPregnancyPage()
  await enterNameAndSubmit()
  await enterNinoAndSubmit()
  await enterCardAddressAndSubmit()
  await enterPhoneNumberAndSubmit()
  await enterEmailAddressAndSubmit()
  await selectTextOnSendCode()
  await enterConfirmationCodeAndSubmit()
}

async function completeTheApplicationAsAWomanWhoIsNotPregnant () {
  await enterDoYouLiveInScotlandNoAndSubmit()
  await enterDateOfBirthAndSubmit()
  await selectNoOnChildrenThreeOrYoungerPage()
  await selectNoOnPregnancyPage()
  await enterNameAndSubmit()
  await enterNinoAndSubmit()
  await enterCardAddressAndSubmit()
  await enterPhoneNumberAndSubmit()
  await enterEmailAddressAndSubmit()
  await selectTextOnSendCode()
  await enterConfirmationCodeAndSubmit()
}

async function setupWiremockMappingsWithStatus (status) {
  if (testsRequireApiMocks()) {
    await setupSuccessfulWiremockClaimMappingWithStatus(status)
  }
}

async function setupWiremockUpdatedClaimMapping (status) {
  if (testsRequireApiMocks()) {
    await setupSuccessfulWiremockUpdatedClaimMapping(status)
  }
}

async function deleteWiremockMappings () {
  if (testsRequireApiMocks()) {
    await deleteAllWiremockMappings()
  }
}

async function getRequestsToClaimService () {
  return getOutboundRequestsToUrl(CLAIMS_ENDPOINT)
}

async function getBodyOfLastRequestToClaimService () {
  const requests = await getRequestsToClaimService()
  if (requests.length) {
    return JSON.parse(path(['body'], requests[requests.length - 1]))
  }
  return null
}

async function assertYesNoOptionsAreDisplayed (page) {
  const labels = await page.getAllRadioLabels()
  const text = await Promise.all(labels.map(async (label) => label.getText()))

  expect(text).to.include(YES_LABEL)
  expect(text).to.include(NO_LABEL)
}

When(/^I do not select an option$/, function () {
  // Specifically does nothing
})

When(/^I click continue$/, async function () {
  await pages.genericPage.submitForm()
})

When(/^I complete the application with valid details$/, async function () {
  await completeTheApplicationAsAWomanWhoIsNotPregnant()
})

module.exports = {
  enterDateOfBirthAndSubmit,
  enterNameAndSubmit,
  enterNinoAndSubmit,
  selectNoOnPregnancyPage,
  enterCardAddressAndSubmit,
  enterPhoneNumberAndSubmit,
  assertErrorHeaderTextPresent,
  completeTheApplicationAsAPregnantWoman,
  completeTheApplicationAsAWomanWhoIsNotPregnant,
  setupWiremockMappingsWithStatus,
  setupWiremockUpdatedClaimMapping,
  deleteWiremockMappings,
  getBodyOfLastRequestToClaimService,
  enterDoYouLiveInScotlandNoAndSubmit,
  assertFieldErrorAndLinkTextPresentAndCorrect,
  assertYesNoOptionsAreDisplayed,
  enterEmailAddressAndSubmit,
  selectNoOnChildrenThreeOrYoungerPage,
  selectTextOnSendCode,
  enterConfirmationCodeAndSubmit
}

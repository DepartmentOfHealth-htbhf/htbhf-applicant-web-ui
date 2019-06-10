const { expect, assert } = require('chai')
const { When } = require('cucumber')
const { path } = require('ramda')

const pages = require('./pages')
const { setupSuccessfulWiremockClaimMappingWithStatus, deleteAllWiremockMappings, setupSuccessfulWiremockUpdatedClaimMapping, getOutboundRequestsToUrl } = require('../wiremock')
const TESTS = process.env.TESTS
const COMPATIBILITY_TESTS = 'compatibility'
const INTEGRATION_TESTS = 'integration'

const testsRequireApiMocks = () => TESTS !== COMPATIBILITY_TESTS && TESTS !== INTEGRATION_TESTS

const { VALID_ELIGIBLE_NINO, FIRST_NAME, LAST_NAME, DAY, MONTH, YEAR, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, POSTCODE, CLAIMS_ENDPOINT } = require('./constants')

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
    await pages.areYouPregnant.selectRadioButton('yes')
    await pages.areYouPregnant.enterValidExpectedDeliveryDate()
    await pages.areYouPregnant.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'Yes' for 'Are you pregnant?' and submit the page - ${error}`)
  }
}

async function selectNoOnPregnancyPage () {
  try {
    await pages.areYouPregnant.selectRadioButton('no')
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

async function assertErrorHeaderTextPresent (page, message = 'There is a problem') {
  try {
    await page.waitForPageLoad()
    const errorHeader = await page.getPageErrorHeaderText()
    expect(errorHeader).to.equal(message)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert error header text is present - ${error}`)
  }
}

async function completeTheApplicationAsAPregnantWoman () {
  await enterNameAndSubmit()
  await enterNinoAndSubmit()
  await enterDateOfBirthAndSubmit()
  await selectYesOnPregnancyPage()
  await enterCardAddressAndSubmit()
}

async function completeTheApplicationAsAWomanWhoIsNotPregnant () {
  await enterNameAndSubmit()
  await enterNinoAndSubmit()
  await enterDateOfBirthAndSubmit()
  await selectNoOnPregnancyPage()
  await enterCardAddressAndSubmit()
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

When(/^I click continue$/, async function () {
  await pages.genericPage.submitForm()
})

When(/^I submit my application$/, async function () {
  await setupWiremockMappingsWithStatus('ELIGIBLE')
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
  assertErrorHeaderTextPresent,
  completeTheApplicationAsAPregnantWoman,
  completeTheApplicationAsAWomanWhoIsNotPregnant,
  setupWiremockMappingsWithStatus,
  setupWiremockUpdatedClaimMapping,
  deleteWiremockMappings,
  getBodyOfLastRequestToClaimService
}

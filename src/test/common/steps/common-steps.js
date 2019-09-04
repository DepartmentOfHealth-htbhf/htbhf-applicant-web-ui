const { assert, expect } = require('chai')
const { When, Then } = require('cucumber')
const { path } = require('ramda')

const pages = require('./pages')
const { setupSuccessfulWiremockClaimMappingWithStatus, deleteAllWiremockMappings, setupSuccessfulWiremockUpdatedClaimMapping, getOutboundRequestsToUrl } = require('../wiremock')
const { assertBackLinkPointsToPage } = require('./common-assertions')
const { get } = require('./../request')
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
  COUNTY,
  POSTCODE,
  CLAIMS_ENDPOINT,
  PHONE_NUMBER,
  EMAIL_ADDRESS
} = require('./constants')

const { SESSION_CONFIRMATION_CODE_URL } = require('./../../common/config')

async function enterDoYouLiveInScotlandNoAndSubmit () {
  try {
    await pages.scotland.selectNoRadioButton()
    await pages.scotland.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select No on the Do You Live In Scotland page and submit - ${error}`)
  }
}

async function enterNameAndSubmit (firstName = FIRST_NAME, lastName = LAST_NAME) {
  try {
    await pages.name.firstNameInputField.enterValue(firstName)
    await pages.name.lastNameInputField.enterValue(lastName)
    await pages.name.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the name and submit the page - ${error}`)
  }
}

async function enterNinoAndSubmit (nino = VALID_ELIGIBLE_NINO) {
  try {
    await pages.nationalInsuranceNumber.inputField.enterValue(nino)
    await pages.nationalInsuranceNumber.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the national insurance number and submit the page - ${error}`)
  }
}

async function enterDateOfBirthAndSubmit (day = DAY, month = MONTH, year = YEAR) {
  try {
    await pages.dateOfBirth.dayInputField.enterValue(day)
    await pages.dateOfBirth.monthInputField.enterValue(month)
    await pages.dateOfBirth.yearInputField.enterValue(year)
    await pages.dateOfBirth.submitForm()
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

async function enterPostcodeAndSubmit (postcode = POSTCODE) {
  try {
    await pages.postcode.postcodeInputField.enterValue(postcode)
    await pages.postcode.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter postcode and submit the page - ${error}`)
  }
}

async function clickAddressNotListedLink () {
  try {
    await pages.selectAddress.clickAddressNotListedLink()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to click enter address manually - ${error}`)
  }
}

async function enterManualAddressAndSubmit (addressLine1 = ADDRESS_LINE_1, addressLine2 = ADDRESS_LINE_2, townOrCity = TOWN, county = COUNTY, postcode = POSTCODE) {
  try {
    await pages.manualAddress.line1InputField.enterValue(addressLine1)
    await pages.manualAddress.line2InputField.enterValue(addressLine2)
    await pages.manualAddress.townOrCityInputField.enterValue(townOrCity)
    await pages.manualAddress.countyField.enterValue(county)
    await pages.manualAddress.postcodeInputField.enterValue(postcode)
    await pages.manualAddress.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter address and submit the page - ${error}`)
  }
}

async function enterPhoneNumberAndSubmit (phoneNumber = PHONE_NUMBER) {
  try {
    await pages.phoneNumber.inputField.enterValue(phoneNumber)
    await pages.phoneNumber.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter phone number and submit the page - ${error}`)
  }
}

async function enterEmailAddressAndSubmit (emailAddress = EMAIL_ADDRESS) {
  try {
    await pages.emailAddress.inputField.enterValue(emailAddress)
    await pages.emailAddress.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter phone number and submit the page - ${error}`)
  }
}

async function selectNoOnDoYouHaveChildrenPage () {
  try {
    await pages.doYouHaveChildren.selectNoRadioButton()
    await pages.doYouHaveChildren.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'No' for 'Do you have children under four years old?' and submit the page - ${error}`)
  }
}

async function selectYesOnDoYouHaveChildrenPage () {
  try {
    await pages.doYouHaveChildren.selectYesRadioButton()
    await pages.doYouHaveChildren.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'Yes' for 'Do you have children under four years old?' and submit the page - ${error}`)
  }
}

async function submitChild3OrUnderDetails (name = 'Joe') {
  try {
    await pages.childDateOfBirth.enterChild3OrUnderDetails(name)
    await pages.childDateOfBirth.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter child details and submit the page - ${error}`)
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

async function selectEmailOnSendCode () {
  try {
    await pages.sendCode.selectEmailRadioButton()
    await pages.sendCode.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'Email' for 'We’re sending you a code' and submit the page - ${error}`)
  }
}

/** iPhone 8 refuses to give us secure cookies - including the session id, so we have to load the session details page in the browser
 * (and assume that the session details app is on the same domain)
 */
async function getConfirmationCodeInBrowser () {
  await pages.genericPage.openPage(SESSION_CONFIRMATION_CODE_URL)
  const body = await pages.genericPage.findByXPath('html/body')
  return body.getText()
}

async function getConfirmationCodeForSession (confirmationCode) {
  if (typeof confirmationCode !== 'undefined') {
    return confirmationCode
  }
  const currentSessionId = await pages.genericPage.getCurrentSessionId()
  if (currentSessionId === null) {
    return getConfirmationCodeInBrowser()
  } else {
    const requestCookie = `htbhf.sid=${currentSessionId}`
    return get(SESSION_CONFIRMATION_CODE_URL, requestCookie)
  }
}

async function enterConfirmationCodeAndSubmit (confirmationCode) {
  try {
    const sessionCode = await getConfirmationCodeForSession(confirmationCode)
    // some browsers may have visited a different page in order to get the session id, so we must reload the enter code page
    await pages.enterCode.openDirect(pages.url)
    await pages.enterCode.inputField.enterValue(sessionCode)
    await pages.enterCode.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter confirmation code for 'Enter code' and submit the page - ${error}`)
  }
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

When(/^I do not select an option$/, function () {
  // Specifically does nothing
})

When(/^I click continue$/, async function () {
  await pages.genericPage.submitForm()
})

Then(/^the beta banner is shown$/, async function () {
  const banner = await pages.genericPage.getBetaBanner()
  const bannerText = await banner.getText()
  expect(bannerText).to.be.equal('This is a new service – your feedback will help us improve it.')
})

Then(/^the beta banner has the correct survey link$/, async function () {
  const feedbackLink = await pages.genericPage.getBetaBannerFeedbackLink()
  const feedbackUrl = await feedbackLink.getAttribute('href')
  expect(feedbackUrl).to.be.equal('https://www.smartsurvey.co.uk/s/apply-for-healthy-start-feedback/')
})

Then(/^the back link on the page links to the do you live in Scotland page$/, async function () {
  await assertBackLinkPointsToPage(pages.scotland)
})

module.exports = {
  enterDateOfBirthAndSubmit,
  enterNameAndSubmit,
  enterNinoAndSubmit,
  selectNoOnPregnancyPage,
  selectYesOnPregnancyPage,
  clickAddressNotListedLink,
  enterManualAddressAndSubmit,
  enterPhoneNumberAndSubmit,
  setupWiremockMappingsWithStatus,
  setupWiremockUpdatedClaimMapping,
  deleteWiremockMappings,
  getBodyOfLastRequestToClaimService,
  enterDoYouLiveInScotlandNoAndSubmit,
  enterEmailAddressAndSubmit,
  selectNoOnDoYouHaveChildrenPage,
  selectTextOnSendCode,
  selectEmailOnSendCode,
  enterConfirmationCodeAndSubmit,
  selectYesOnDoYouHaveChildrenPage,
  submitChild3OrUnderDetails,
  enterPostcodeAndSubmit
}

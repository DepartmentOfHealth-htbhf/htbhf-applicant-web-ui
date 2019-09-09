/* eslint-disable no-unused-expressions */
const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const Promise = require('bluebird')

const pages = require('./pages')
const { enterDetailsUpToPage, DEFAULT_ACTION_OPTIONS, STEP_PAGE_ACTIONS } = require('./navigation')
const { enterPostcodeAndSubmit, selectFirstAddress } = require('./common-steps')
const { setupPostcodeLookupWithNoResults, setupPostcodeLookupWithResults, createPostcodeLookupWithResultsMapping } = require('../wiremock')
const { POSTCODE } = require('./constants')

const POSTCODE_WITH_NO_RESULTS = 'BS11AA'

const stepActionsWithoutManualAddress = (stepPageActions) => stepPageActions.filter(pageAction => pageAction.page(pages) !== pages.manualAddress)

const assertAddressOptionTextMatchesResult = (results) => async (option, index) => {
  const address = results[index].DPA.ADDRESS.toLowerCase()
  const optionText = await option.getText()
  expect(address.includes(optionText.toLowerCase())).to.be.true
}

const verifyAddressOptionsText = async (postcode, options) => {
  const mockApiResponse = JSON.parse(createPostcodeLookupWithResultsMapping(postcode))
  const { results } = mockApiResponse.response.jsonBody
  await Promise.each(options, assertAddressOptionTextMatchesResult(results))
}

Given(/^I have entered my details up to the check answers page and selected an address$/, async function () {
  const actionOptions = { ...DEFAULT_ACTION_OPTIONS, selectAddress: true }
  // manual address page is skipped when the user selects an address
  const stepActions = stepActionsWithoutManualAddress(STEP_PAGE_ACTIONS)
  await enterDetailsUpToPage({ pageName: pages.checkAnswers.getPageName(), actionOptions, stepActions })
})

When(/^I enter a postcode that returns no search results$/, async function () {
  await setupPostcodeLookupWithNoResults(POSTCODE_WITH_NO_RESULTS)
  await enterPostcodeAndSubmit(POSTCODE_WITH_NO_RESULTS)
})

When(/^I enter a postcode that returns search results$/, async function () {
  await setupPostcodeLookupWithResults(POSTCODE)
  await enterPostcodeAndSubmit(POSTCODE)
})

When(/^I enter (.*) as my postcode$/, async function (postcode) {
  await enterPostcodeAndSubmit(postcode)
})

When(/^I select an address$/, async function () {
  await selectFirstAddress()
})

When(/^I click the address not listed link$/, async function () {
  await pages.selectAddress.clickAddressNotListedLink()
})

When(/^I click the change postcode link$/, async function () {
  await pages.selectAddress.clickChangePostcodeLink()
})

Then(/^I am shown the select address page$/, async function () {
  await pages.selectAddress.waitForPageLoad()
})

Then(/^I am informed that no addresses were found for my postcode$/, async function () {
  const addressNotFoundElement = await pages.selectAddress.getAddressNotFoundElement()
  expect(await addressNotFoundElement.isDisplayed()).to.be.true
})

Then(/^I am shown a button to enter my address manually$/, async function () {
  const buttonText = await pages.selectAddress.getSubmitButtonText()
  expect(buttonText).to.be.equal('Enter address manually')
})

Then(/^I am shown a list of addresses$/, async function () {
  const addressOptions = await pages.selectAddress.getAddressOptions()
  expect(addressOptions.length).to.be.equal(11)
  await verifyAddressOptionsText(POSTCODE, addressOptions)
})

Then(/^I am shown an address not listed link$/, async function () {
  const addressNotListedLink = await pages.selectAddress.getAddressNotListedLink()
  const href = await addressNotListedLink.getAttribute('href')
  expect(href).to.be.equal(`${pages.url}${pages.manualAddress.getPath()}`)
})

Then(/^I am shown a link to change my postcode$/, async function () {
  const changePostcodeLink = await pages.selectAddress.getChangePostcodeLink()
  const href = await changePostcodeLink.getAttribute('href')
  expect(href).to.be.equal(`${pages.url}${pages.postcode.getPath()}`)
})

Then(/^I am shown a continue button$/, async function () {
  const buttonText = await pages.selectAddress.getSubmitButtonText()
  expect(buttonText).to.be.equal('Continue')
})

Then(/^I am shown the postcode page$/, async function () {
  await pages.postcode.waitForPageLoad()
})

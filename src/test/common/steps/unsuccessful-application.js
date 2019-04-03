const { Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { deleteWiremockMappings } = require('./common-steps')

const statusToBodyTextMap = {
  'INELIGIBLE': 'You are not on a qualifying benefit',
  'PENDING': 'Your benefit status is pending',
  'NOMATCH': 'You have not been found',
  'ERROR': 'An error occurred whilst checking your eligibility',
  'DUPLICATE': 'A claim already exists with your details'
}

Then(/^I am shown the application unsuccessful page$/, async function () {
  await pages.unsuccessfulApplication.waitForPageLoad()
  await deleteWiremockMappings()
})

Then(/^the page content displays that I am not eligible because my status is (.*)$/, async function (status) {
  await pages.unsuccessfulApplication.waitForPageLoad()
  const bodyText = await pages.unsuccessfulApplication.getBodyText()
  expect(bodyText.toString().trim()).to.be.equal(statusToBodyTextMap[status])

  await deleteWiremockMappings()
})

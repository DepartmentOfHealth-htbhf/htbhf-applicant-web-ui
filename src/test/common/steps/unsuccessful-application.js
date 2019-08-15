const { Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { deleteWiremockMappings } = require('./common-steps')

const statusToBodyTextMap = {
  // *during private beta* INELIGIBLE messaging refers to being unable to find someone in our records, as all invited applicants are eligible
  'INELIGIBLE': 'We cannot find you in our records. You may have entered something wrong.',
  'PENDING': 'Your benefit status is pending',
  'NO_MATCH': 'We cannot find you in our records. You may have entered something wrong.',
  'ERROR': 'An error occurred whilst checking your eligibility',
  'DUPLICATE': 'A claim already exists with your details'
}

Then(/^I am shown the application unsuccessful page$/, async function () {
  await pages.unsuccessfulApplication.waitForPageLoad()
  await deleteWiremockMappings()
})

Then(/^the page content displays that I am not eligible because my eligibility status is (.*)$/, async function (status) {
  await pages.unsuccessfulApplication.waitForPageLoad()
  const bodyText = await pages.unsuccessfulApplication.getBodyText()
  expect(bodyText.toString().trim()).to.be.equal(statusToBodyTextMap[status])

  await deleteWiremockMappings()
})

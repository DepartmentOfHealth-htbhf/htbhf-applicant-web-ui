const { Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { deleteWiremockMappings } = require('./common-steps')

const statusToBodyTextMap = {
  'INELIGIBLE': 'You are not eligible for help to buy health start',
  'PENDING': 'Your benefit status is pending',
  'NOMATCH': 'You have not been found',
  'ERROR': 'An error occurred whilst checking your eligibility'
}

Then(/^I am shown the application unsuccessful page$/, async function () {
  await pages.unsuccessfulApplication.waitForPageLoad()
  await deleteWiremockMappings()
})

Then(/^the page content displays that I am not eligible because my status is (.*)$/, async function (status) {
  await pages.unsuccessfulApplication.waitForPageLoad()
  await checkAllPageContentIsPresentAndCorrectForNonEligibleClaim(status)
  await deleteWiremockMappings()
})

async function checkAllPageContentIsPresentAndCorrectForNonEligibleClaim (status) {
  const h2Text = await pages.unsuccessfulApplication.getH2Text()
  expect(h2Text.toString().trim()).to.be.equal('Unfortunately you not eligible for help to buy healthy foods', 'expected confirm page H2 text to be correct')
  const panelTitle = await pages.unsuccessfulApplication.getPanelTitleText()
  expect(panelTitle.toString().trim()).to.be.equal('Application unsuccessful', 'expected confirmation header to be correct')
  const panelBody = await pages.unsuccessfulApplication.getPanelBodyText()
  expect(panelBody.toString().trim()).to.be.equal(statusToBodyTextMap[status], 'expected confirmation body to be correct')
}

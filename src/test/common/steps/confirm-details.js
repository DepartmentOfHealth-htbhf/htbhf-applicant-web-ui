const { Given, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { deleteWiremockMappings, getBodyOfLastRequestToClaimService } = require('./common-steps')
const { toDateString } = require('../../../web/routes/application/common/formatters')
const { dateLastYear } = require('../../common/dates')

const expectedClaim = { body: {} }

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
  FORMATTED_PHONE_NUMBER,
  EMAIL_ADDRESS,
  VALID_PREGNANCY_MONTH_INCREMENT
} = require('./constants')

Given(/^I prepare an application with valid details$/, function () {
  const dueDate = new Date()
  dueDate.setMonth(dueDate.getMonth() + VALID_PREGNANCY_MONTH_INCREMENT)
  const childDob = dateLastYear()
  expectedClaim.body = {
    firstName: FIRST_NAME,
    lastName: LAST_NAME,
    nino: VALID_ELIGIBLE_NINO,
    dateOfBirth: toDateString(DAY, MONTH, YEAR),
    address: {
      addressLine1: ADDRESS_LINE_1,
      addressLine2: ADDRESS_LINE_2,
      townOrCity: TOWN,
      county: COUNTY,
      postcode: POSTCODE
    },
    expectedDeliveryDate: toDateString(dueDate.getDate(), dueDate.getMonth() + 1, dueDate.getFullYear()),
    phoneNumber: FORMATTED_PHONE_NUMBER,
    emailAddress: EMAIL_ADDRESS,
    childrenDob: [toDateString(childDob.getDate(), childDob.getMonth() + 1, childDob.getFullYear())]

  }
})

Then(/^all page content is present on the confirm details page$/, async function () {
  await checkAllPageContentIsPresentAndCorrect()
  await deleteWiremockMappings()
})

Then(/^I am informed that my claim has been updated$/, async function () {
  await checkExistingClaimUpdatedTextIsPresent()
})

Then(/^I am shown the confirm details page$/, async function () {
  await pages.confirm.waitForPageLoad()
  await deleteWiremockMappings()
})

Then(/^I am shown the confirm updated page$/, async function () {
  await pages.confirmUpdated.waitForPageLoad()
  await deleteWiremockMappings()
})

Then(/^I am shown a successful confirmation page$/, async function () {
  await pages.confirm.waitForPageLoad()
  await checkAllPageContentIsPresentAndCorrect()
  await deleteWiremockMappings()
})

Then(/^my entitlement is 12.40 per week with a first payment of 49.60$/, async function () {
  const totalVoucherValue = await pages.confirm.getPanelBodyText()
  expect(totalVoucherValue.toString().trim()).to.be.equal('You’re entitled to\n£12.40 a week. Your first payment\nwill be £49.60.')
})

Then(/^my claim is sent to the back end$/, async function () {
  const body = await getBodyOfLastRequestToClaimService()
  expect(body).to.have.property('claimant')
  expect(body).to.have.property('deviceFingerprint')
  expect(body).to.have.property('webUIVersion')
  expect(body.claimant).to.deep.equal(expectedClaim.body)
})

async function checkAllPageContentIsPresentAndCorrect () {
  const h2Text = await pages.confirm.getH2Text()
  expect(h2Text.toString().trim()).to.be.equal('What happens next', 'expected confirm page H2 text to be correct')
  const panelTitle = await pages.confirm.getPanelTitleText()
  expect(panelTitle.toString().trim()).to.be.equal('Application complete', 'expected confirmation header to be correct')
}

// TODO DW HTBHF-1453 update once we have content
async function checkExistingClaimUpdatedTextIsPresent () {
  const h2Text = await pages.confirm.getH2Text()
  expect(h2Text.toString().trim()).to.be.equal('What happens next', 'expected confirm updated page H2 text to be correct')
  const panelTitle = await pages.confirm.getPanelTitleText()
  expect(panelTitle.toString().trim()).to.be.equal('Application updated', 'expected confirmation header to be correct')
}

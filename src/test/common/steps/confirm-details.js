const { Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { deleteWiremockMappings } = require('./common-steps')

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

Then(/^my entitlement is 12.40 per week$/, async function () {
  const totalVoucherValue = await pages.confirm.getPanelBodyText()
  expect(totalVoucherValue.toString().trim()).to.be.equal('You are entitled to\n£12.40 per week', 'expected total voucher value to be correct')
  await assertVoucherEntitlementValuesForAttr('total-voucher-value-four-weeks', '49.60')
})

async function checkAllPageContentIsPresentAndCorrect () {
  const h2Text = await pages.confirm.getH2Text()
  expect(h2Text.toString().trim()).to.be.equal('What happens next', 'expected confirm page H2 text to be correct')
  const panelTitle = await pages.confirm.getPanelTitleText()
  expect(panelTitle.toString().trim()).to.be.equal('Application complete', 'expected confirmation header to be correct')
}

async function checkExistingClaimUpdatedTextIsPresent () {
  const h2Text = await pages.confirm.getH2Text()
  expect(h2Text.toString().trim()).to.be.equal('What happens next', 'expected confirm updated page H2 text to be correct')
  const panelTitle = await pages.confirm.getPanelTitleText()
  expect(panelTitle.toString().trim()).to.be.equal('Application updated', 'expected confirmation header to be correct')
}

async function assertVoucherEntitlementValuesForAttr (attr, expectedValue) {
  try {
    const message = `expected all references to ${attr.replace('-', ' ')} to be correct`
    const refs = await pages.confirm.getVoucherEntitlementRefsForDataAttr(attr)
    const incorrectAmounts = refs.filter(value => value !== expectedValue)
    expect(incorrectAmounts.length).to.be.equal(0, message)
  } catch (error) {
    console.log(error)
  }
}

const { Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')
const { deleteWiremockMappings } = require('./common-steps')

Then(/^all page content is present on the confirm details page$/, async function () {
  await checkAllPageContentIsPresentAndCorrect()
  await deleteWiremockMappings()
})

Then(/^I am shown the confirm details page$/, async function () {
  await pages.confirm.waitForPageLoad()
  await deleteWiremockMappings()
})

Then(/^I am shown a successful confirmation page$/, async function () {
  await pages.confirm.waitForPageLoad()
  await checkAllPageContentIsPresentAndCorrect()
  await deleteWiremockMappings()
})

async function checkAllPageContentIsPresentAndCorrect () {
  const h2Text = await pages.confirm.getH2Text()
  expect(h2Text.toString().trim()).to.be.equal('What happens next', 'expected confirm page H2 text to be correct')
  const panelTitle = await pages.confirm.getPanelTitleText()
  expect(panelTitle.toString().trim()).to.be.equal('Application complete', 'expected confirmation header to be correct')
  const panelBody = await pages.confirm.getPanelBodyText()
  expect(panelBody.toString().trim()).to.be.equal('You are entitled to\n£3.10 per week', 'expected confirmation body to be correct')
}

const { Then } = require('cucumber')

const pages = require('./pages')
const { deleteAllWiremockMappings } = require('../wiremock')

Then(/^all page content is present on the confirm details page$/, async function () {
  await checkAllPageContentIsPresentAndCorrect()
  await deleteAllWiremockMappings()
})

Then(/^I am shown the confirm details page$/, async function () {
  await pages.confirm.waitForPageLoad()
})

Then(/^I am shown a successful confirmation page$/, async function () {
  await pages.confirm.waitForPageLoad()
  await checkAllPageContentIsPresentAndCorrect()
  await deleteAllWiremockMappings()
})

async function checkAllPageContentIsPresentAndCorrect () {
  // Do some assertions
}

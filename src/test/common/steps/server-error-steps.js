const { When, Then } = require('cucumber')

const pages = require('./pages')
const {
  setupErrorWiremockClaimMapping,
  deleteAllWiremockMappings } = require('../wiremock')

When(/^An error occurs after clicking the submit button$/, async function () {
  await setupErrorWiremockClaimMapping()
  await pages.checkAnswers.submitForm()
})

Then(/^I am shown the Server Error page$/, async function () {
  await pages.serverError.waitForPageLoad()
  await deleteAllWiremockMappings()
})

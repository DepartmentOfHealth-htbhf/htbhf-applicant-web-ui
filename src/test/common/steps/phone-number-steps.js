const { Then } = require('cucumber')
const pages = require('./pages')

Then(/^I am shown the phone number page$/, async function () {
  await pages.phoneNumber.waitForPageLoad()
})

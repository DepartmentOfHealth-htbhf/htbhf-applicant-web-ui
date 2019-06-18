const { Then } = require('cucumber')

const pages = require('./pages')

Then(/^I am shown the email address page$/, async function () {
  await pages.emailAddress.waitForPageLoad()
})

const { Then } = require('cucumber')

const pages = require('./pages')

Then(/^I am shown the do you live in scotland page$/, async function () {
  await pages.doYouLiveInScotland.waitForPageLoad()
})

const { Then } = require('cucumber')

const pages = require('./pages')

Then(/^I am shown the choose channel for code page$/, async function () {
  await pages.chooseChannelForCode.waitForPageLoad()
})

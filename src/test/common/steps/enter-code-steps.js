const { Then } = require('cucumber')

const pages = require('./pages')

Then(/^I am shown the enter code page$/, async function () {
  await pages.enterCode.waitForPageLoad()
})

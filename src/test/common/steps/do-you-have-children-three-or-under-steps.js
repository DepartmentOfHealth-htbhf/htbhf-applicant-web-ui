const { Then } = require('cucumber')

const pages = require('./pages')

Then(/^I am shown the do you have children three or younger page$/, async function () {
  await pages.doYouHaveChildrenThreeOrYounger.waitForPageLoad()
})

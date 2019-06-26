const { Then } = require('cucumber')

const pages = require('./pages')

Then(/^I am shown the do you have children three or under page$/, async function () {
  await pages.doYouHaveChildrenThreeOrUnder.waitForPageLoad()
})

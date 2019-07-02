const { Then } = require('cucumber')
const { assertBackLinkPointsToPage } = require('./common-assertions')

const pages = require('./pages')

Then(/^I am shown the add your childrens dates of birth page$/, async function () {
  await pages.addChildrenDOB.waitForPageLoad()
})

Then(/^The back link points to the Add your children’s dates of birth page$/, async function () {
  await assertBackLinkPointsToPage(pages.addChildrenDOB)
})

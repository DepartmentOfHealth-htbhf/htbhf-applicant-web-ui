const { Then } = require('cucumber')

const pages = require('./pages')

Then(/^I am shown the add your childrens dates of birth page$/, async function () {
  await pages.addChildrenDOB.waitForPageLoad()
})

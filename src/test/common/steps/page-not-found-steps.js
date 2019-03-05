const { When, Then } = require('cucumber')
const { expect } = require('chai')
const pages = require('./pages')

When(/^I go to a non-existent page$/, async function () {
  await pages.pageNotFound.open(pages.url)
})

Then(/^I am shown the Page Not Found page$/, async function () {
  const heading = await pages.pageNotFound.getH1Text()
  expect(heading).to.equal('Page not found')
})

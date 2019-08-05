const { When, Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')

When(/^I open the (.*) guidance page$/, async function (pageName) {
  await pages.guidance.openGuidancePage(pages.url, pageName)
})

Then(/^all the (.*) guidance page content is present$/, async function (pageName) {
  await assertGuidancePageHeadersCorrect(pageName)
  await assertGuidancePageContentsCorrect(pageName)
  await assertGuidancePageNavigationLinksCorrect(pageName)
})

async function assertGuidancePageHeadersCorrect (pageName) {
  const h1Text = await pages.cookies.getH1Text()
  expect(h1Text.toString().trim()).to.be.equal('Get money off milk, food and vitamins (Healthy Start)',
    'expected guidance page H1 text to be correct')
  const h2Text = await pages.cookies.getH2Text()
  expect(h2Text.toString().trim()).to.be.equal(pageName, 'expected guidance page H2 text to be correct')
}

// Make sure that the links in the table of contents are correct on the page
async function assertGuidancePageContentsCorrect (pageName) {
  const contentLinks = await pages.guidance.getContentsLinks(pageName)
  expect(contentLinks).to.be.lengthOf(6, 'must have correct number of contents links')
}

// Make sure there is the correct previous / next links on the page
async function assertGuidancePageNavigationLinksCorrect (pageName) {
  if (pages.guidance.hasPreviousLink(pageName)) {
    const previousLink = await pages.guidance.findPreviousLinkForPage(pageName)
    expect(previousLink.toString().trim()).not.to.be.equal(undefined)
  }

  if (pages.guidance.hasNextLink(pageName)) {
    const nextLink = await pages.guidance.findNextLinkForPage(pageName)
    expect(nextLink.toString().trim()).not.to.be.equal(undefined)
  }
}

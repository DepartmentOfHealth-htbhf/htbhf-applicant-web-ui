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

Then(/^I am shown the guidance page$/, async function () {
  await pages.guidance.openApplyPage(pages.url)
})

// The original session id is stored on the Guidance page, but to get a new session id we need to make sure
// that we navigate to a subsequent page (back to the Guidance page is sufficient) to check for a new session id
// We also verify that the lang cookie has been removed
Then(/^my session has been destroyed$/, async function () {
  const pageSessionId = pages.guidance.sessionId
  const langCookie = await pages.guidance.getLangCookie()
  expect(langCookie).to.be.equal(undefined)
  await pages.guidance.openApplyPage(pages.url)
  const currentSessionId = await pages.guidance.getCurrentSessionId()
  expect(pageSessionId).not.to.be.equal(currentSessionId)
})

Then(/^my session has not been destroyed$/, async function () {
  const pageSessionId = pages.guidance.sessionId
  // TODO - Enable this assertion when language support has been reinstated, the language cookie is not currently
  //  set so this assertion cannot be made until it is reinstated.
  // const langCookie = await pages.guidance.getLangCookie()
  // expect(langCookie).not.to.be.equal(undefined)
  await pages.guidance.openApplyPage(pages.url)
  const currentSessionId = await pages.guidance.getCurrentSessionId()
  expect(pageSessionId).to.be.equal(currentSessionId)
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

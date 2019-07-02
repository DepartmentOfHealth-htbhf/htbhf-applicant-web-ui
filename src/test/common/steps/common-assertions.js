const { expect } = require('chai')

const pages = require('./pages')

async function assertBackLinkPointsToPage (expectedPage) {
  const backLinkPresent = await expectedPage.isBackLinkPresent()
  expect(backLinkPresent).to.equal(true, 'Back link should be present on the page')

  const backLink = await expectedPage.getBackLink()
  const href = await backLink.getAttribute('href')
  const expectedUrl = `${pages.url}${expectedPage.getPath()}`
  const correctHref = href === expectedUrl || href.startsWith(expectedUrl + '?')
  expect(correctHref).to.equal(true, `back link url should be '${expectedUrl}', is '${href}'`)
}

module.exports = {
  assertBackLinkPointsToPage
}

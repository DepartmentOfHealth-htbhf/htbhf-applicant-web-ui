const { expect } = require('chai')

const pages = require('./pages')

async function assertBackLinkUrlIsEqualTo (expectedUrl) {
  const backLinkPresent = await pages.genericPage.isBackLinkPresent()
  expect(backLinkPresent).to.equal(true, 'Back link should be present on the page')
  const backLink = await pages.genericPage.getBackLink()

  const href = await backLink.getAttribute('href')
  const correctHref = href === expectedUrl || href.startsWith(expectedUrl + '?')
  expect(correctHref).to.equal(true, `back link url should be '${expectedUrl}', is '${href}'`)
}

module.exports = {
  assertBackLinkUrlIsEqualTo
}

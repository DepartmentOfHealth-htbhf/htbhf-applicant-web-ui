const { Then } = require('cucumber')
const { expect } = require('chai')

const pages = require('./pages')

Then(/^I am shown the I live in Scotland page$/, async function () {
  await pages.iLiveInScotland.waitForPageLoad()
})

Then(/^I am informed that I cannot apply and should use the Scottish scheme$/, async function () {
  const h1Text = await pages.iLiveInScotland.getH1Text()
  expect(h1Text.toString().trim()).to.be.equal('You cannot apply if you live in Scotland',
    'expected I live in Scotland page H1 text to be correct')
  const body = await pages.iLiveInScotland.getAllBodyText()
  expect(body[0]).to.be.equal('You can only apply for this scheme if you live in England, Wales or Northern Ireland.',
    'expected first paragraph body text for the I live in Scotland page to be as expected')
  expect(body[1]).to.be.equal('If you live in Scotland you can apply for Best Start Foods.',
    'expected second paragraph body text for the I live in Scotland page to be as expected')
})

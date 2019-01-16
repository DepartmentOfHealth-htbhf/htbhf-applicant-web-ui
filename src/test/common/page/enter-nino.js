'use strict'

const Page = require('./page')
const { expect } = require('chai')

const PAGE_TITLE = 'GOV.UK - What is your national insurance number?'

/**
 * Page object for EnterNino page where the name is entered.
 */
class EnterNino extends Page {
  async waitForPageLoad () {
    const h1Text = await this.getH1Text()
    expect(h1Text).to.be.equal('What is your national insurance number?')
    return this.waitForPageWithTitle(PAGE_TITLE)
  }
}

module.exports = EnterNino

'use strict'
const { head, last } = require('ramda')
const Page = require('./page')

const { PAGES, getPageMetadata } = require('../../../web/routes/guidance')

/**
 * Page object for all the guidance pages. This may extend Page, but as it represent multiple static page, it must
 * implement its own methods for navigation, but can use all the find methods from Page when required.
 */
class Guidance extends Page {
  async openGuidancePage (baseURL, pageName, lang = 'en') {
    try {
      await this.openPage(`${baseURL}${this.getPageWithTitle(PAGES, pageName).path}`, lang)
      return super.waitForPageWithTitle(this.getPageTitle(pageName))
    } catch (error) {
      console.error(`Error caught trying to open guidance page at: ${baseURL}`, error)
      throw new Error(error)
    }
  }

  getPageTitle (pageName) {
    return `GOV.UK - ${pageName}`
  }

  getPageWithTitle (pages, pageName) {
    return pages.find(page => page.title === pageName)
  }

  hasPreviousLink (pageName) {
    return pageName !== head(PAGES).title
  }

  hasNextLink (pageName) {
    return pageName !== last(PAGES).title
  }

  getNextLink (pageName) {
    return this.getPageMetadataForPage(pageName).nextPage
  }

  getPreviousLink (pageName) {
    return this.getPageMetadataForPage(pageName).previousPage
  }

  getPageMetadataForPage (pageName) {
    return getPageMetadata(PAGES, this.getPageWithTitle(PAGES, pageName).path)
  }

  async findNextLinkForPage (pageName) {
    const nextLinkHref = this.getNextLink(pageName).path
    return this.findLinkForHref(nextLinkHref)
  }

  async findPreviousLinkForPage (pageName) {
    const previousLinkHref = this.getPreviousLink(pageName).path
    return this.findLinkForHref(previousLinkHref)
  }

  // Find links in the contents section, which should be for all the pages except the current page
  async getContentsLinks (pageName) {
    const allPagesExceptCurrent = PAGES.filter(page => page.title !== pageName)
    const pagePaths = allPagesExceptCurrent.map(async (page) => this.findLinkForHref(this.getPageMetadataForPage(page.title).activePath))
    return Promise.all(pagePaths)
  }

  async findLinkForHref (href) {
    const linkCss = `a[href="${href}"]`
    return this.findByCSS(linkCss)
  }
}

module.exports = Guidance

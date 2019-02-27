/* eslint-disable no-console */
'use strict'

const webdriver = require('selenium-webdriver')

const COOKIES_LINK_CSS = 'a[href="/cookies"]'
const ERROR_HEADER_SELECTOR = 'h2#error-summary-title'
const DEFAULT_WAIT_MILLIS = 5000
const CSS_TYPE = 'CSS'
const ID_TYPE = 'ID'
const CLASSNAME_TYPE = 'CLASSNAME'
const BY = {
  [CSS_TYPE]: webdriver.By.css,
  [CLASSNAME_TYPE]: webdriver.By.className,
  [ID_TYPE]: webdriver.By.id
}

/**
 * Base Page class containing all core functionality - nothing which is specific for a single page
 * should be contained within this class.
 */
class Page {
  constructor (driver) {
    this.driver = driver
  }

  async open (baseURL, lang = 'en') {
    await this.openDirect(baseURL, lang)
    return this.waitForPageLoad(lang)
  }

  async openDirect (baseURL, lang = 'en') {
    await this.openPage(`${baseURL}${this.getPath()}`, lang)
  }

  async openPage (url, lang) {
    const queryParam = lang ? `?lang=${lang}` : ''
    try {
      return this.driver.get(`${url}${queryParam}`)
    } catch (error) {
      console.error('Unable to open page at', url, error)
    }
  }

  getPath () {
    throw new Error('getPath needs to be implemented by all Page objects')
  }

  getPageName () {
    throw new Error('getPageName needs to be implemented by all Page objects')
  }

  async findById (id) {
    try {
      await this.waitForElement(id, ID_TYPE)
      return this.driver.findElement(webdriver.By.id(id))
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findByClassName (className, scope = this.driver) {
    try {
      await this.waitForElement(className, CLASSNAME_TYPE)
      return scope['findElement'](webdriver.By.className(className))
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findAllByClassName (className) {
    try {
      await this.waitForElement(className, CLASSNAME_TYPE)
      return this.driver.findElements(webdriver.By.className(className))
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findByCSS (selector) {
    try {
      await this.waitForElement(selector, CSS_TYPE)
      return this.driver.findElement(webdriver.By.css(selector))
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findByXPath (xpath) {
    try {
      return await this.driver.findElement(webdriver.By.xpath(xpath))
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findH1 () {
    return this.findByCSS('h1')
  }

  async findH2 () {
    return this.findByCSS('h2')
  }

  async getH1Text () {
    const h1Element = await this.findH1()
    return h1Element.getText()
  }

  async getH2Text () {
    const h2Element = await this.findH2()
    return h2Element.getText()
  }

  async waitForPageWithTitle (title) {
    return this.driver.wait(webdriver.until.titleIs(title), DEFAULT_WAIT_MILLIS)
  }

  async waitForElement (selector, type, timeout = DEFAULT_WAIT_MILLIS) {
    return this.driver.wait(webdriver.until.elementLocated(BY[type](selector)), timeout)
  }

  async getPageErrorHeader () {
    return this.findByCSS(ERROR_HEADER_SELECTOR)
  }

  async getPageErrorHeaderText () {
    const pageError = await this.getPageErrorHeader()
    return pageError.getText()
  }

  async getLangAttribute () {
    const html = await this.findByClassName('govuk-template')
    return html.getAttribute('lang')
  }

  async clickCookieLink () {
    const cookieLink = await this.findByCSS(COOKIES_LINK_CSS)
    await cookieLink.click()
  }
}

module.exports = Page

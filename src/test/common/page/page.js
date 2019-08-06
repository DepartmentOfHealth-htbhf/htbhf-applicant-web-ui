/* eslint-disable no-console */
'use strict'

const webdriver = require('selenium-webdriver')

const BACK_LINK_CLASSNAME = 'govuk-back-link'
const COOKIES_LINK_CSS = 'a[href="/cookies"]'
const PRIVACY_NOTICE_LINK_CSS = 'a[href="/privacy-notice"]'
const ERROR_HEADER_SELECTOR = 'h2#error-summary-title'
const DEFAULT_WAIT_MILLIS = 5000
const CSS_TYPE = 'CSS'
const ID_TYPE = 'ID'
const CLASSNAME_TYPE = 'CLASSNAME'
const XPATH_TYPE = 'XPATH'
const BY = {
  [CSS_TYPE]: webdriver.By.css,
  [CLASSNAME_TYPE]: webdriver.By.className,
  [ID_TYPE]: webdriver.By.id,
  [XPATH_TYPE]: webdriver.By.xpath
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
    try {
      await this.openDirect(baseURL, lang)
      return this.waitForPageLoad(lang)
    } catch (error) {
      console.error(`Error caught trying to open page at: ${baseURL}`, error)
      throw new Error(error)
    }
  }

  async openDirect (baseURL, lang = 'en') {
    try {
      return this.openPage(`${baseURL}${this.getPath()}`, lang)
    } catch (error) {
      console.error(`Unable to open URL direct: ${baseURL}`, error)
      throw new Error(error)
    }
  }

  async openPage (url, lang) {
    try {
      const queryParam = lang ? `?lang=${lang}` : ''
      return this.driver.get(`${url}${queryParam}`)
    } catch (error) {
      console.error('Unable to open page at: ', url, error)
      throw new Error(error)
    }
  }

  getPath () {
    throw new Error('getPath needs to be implemented by all Page objects')
  }

  getPageName () {
    throw new Error('getPageName needs to be implemented by all Page objects')
  }

  async findBy (method, selector, scope = this.driver) {
    try {
      await this.waitForElement(selector, method)
      return scope['findElement'](BY[method](selector))
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findAllBy (method, selector) {
    try {
      return this.driver.findElements(BY[method](selector))
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findById (id, scope) {
    return this.findBy(ID_TYPE, id, scope)
  }

  async findAllById (id) {
    return this.findAllBy(ID_TYPE, id)
  }

  async findByClassName (className, scope) {
    return this.findBy(CLASSNAME_TYPE, className, scope)
  }

  async findAllByClassName (className) {
    return this.findAllBy(CLASSNAME_TYPE, className)
  }

  async findByCSS (selector, scope) {
    return this.findBy(CSS_TYPE, selector, scope)
  }

  async findAllByCSS (selector) {
    return this.findAllBy(CSS_TYPE, selector)
  }

  async findByXPath (xpath, scope) {
    return this.findBy(XPATH_TYPE, xpath, scope)
  }

  async findAllByXPath (xpath) {
    return this.findAllBy(XPATH_TYPE, xpath)
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

  async clickPrivacyNoticeLink () {
    const privacyLink = await this.findByCSS(PRIVACY_NOTICE_LINK_CSS)
    await privacyLink.click()
  }

  async getBackLink () {
    return this.findByClassName(BACK_LINK_CLASSNAME)
  }

  async isElementWithClassPresent (className) {
    try {
      await this.waitForElement(className, CLASSNAME_TYPE)
      return true
    } catch (error) {
      return false
    }
  }

  async isBackLinkPresent () {
    return this.isElementWithClassPresent(BACK_LINK_CLASSNAME)
  }

  /**
   * Gets the visible text from a field error element. i.e. an element with class 'govuk-error-message'
   */
  async getVisibleTextFromFieldError (errorElement) {
    const fullErrorText = await errorElement.getText()
    const hiddenError = await errorElement.findElement(webdriver.By.className('govuk-visually-hidden'))
    const hiddenErrorText = await hiddenError.getText()
    return fullErrorText.replace(hiddenErrorText, '').trim()
  }

  async getCurrentSessionId () {
    const sessionCookie = await this.getCookieByName('htbhf.sid')
    return (typeof sessionCookie !== 'undefined') ? sessionCookie.value : null
  }

  async getLangCookie () {
    return this.getCookieByName('lang')
  }

  async getCookieByName (cookieName) {
    const cookies = await this.getCookies()
    return cookies.find(cookie => cookie.name === cookieName)
  }

  async getCookies () {
    const manage = await this.getManage()
    return manage.getCookies()
  }

  async getManage () {
    const driver = await this.getDriver()
    return driver.manage()
  }

  async getDriver () {
    return this.driver
  }
}

module.exports = Page

/* eslint-disable no-console */
'use strict'

const webdriver = require('selenium-webdriver')

const ERROR_HEADER_SELECTOR = 'h2#error-summary-title'
const DEFAULT_WAIT_MILLIS = 5000

/**
 * Base Page class containing all core functionality - nothing which is specific for a single page
 * should be contained within this class.
 */
class Page {
  constructor (driver) {
    this.driver = driver
  }

  async open (url) {
    try {
      return this.driver.get(url)
    } catch (error) {
      console.error('Unable to open page at', url, error)
    }
  }

  async findById (id) {
    return this.driver.findElement(webdriver.By.id(id))
  }

  async findByClassName (className) {
    return this.driver.findElement(webdriver.By.className(className))
  }

  async findByCSS (selector) {
    return this.driver.findElement(webdriver.By.css(selector))
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

  async waitForElement ({ selector, type = 'CSS', timeout = DEFAULT_WAIT_MILLIS }) {
    const by = {
      'CSS': webdriver.By.css
    }

    return this.driver.wait(webdriver.until.elementLocated(by[type](selector)), timeout)
  }

  async getPageErrorHeader () {
    await this.waitForElement({ selector: ERROR_HEADER_SELECTOR })
    return this.findByCSS(ERROR_HEADER_SELECTOR)
  }

  async getPageErrorHeaderText () {
    const pageError = await this.getPageErrorHeader()
    return pageError.getText()
  }
}

module.exports = Page

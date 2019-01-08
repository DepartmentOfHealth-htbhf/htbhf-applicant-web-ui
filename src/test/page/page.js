/* eslint-disable no-console */
'use strict';

const webdriver = require('selenium-webdriver');

const ERROR_SELECTOR = '.error-summary h2';
const DEFAULT_WAIT_MILLIS = 5000;

/**
 * Base Page class containing all core functionality - nothing which is specific for a single page
 * should be contained within this class.
 */
class Page {

  constructor(driver) {
    this.driver = driver;
  }

  async open(url) {
    try {
      return await this.driver.get(url);
    } catch (error) {
      console.error('Unable to open page at', url, error);
    }
  }

  async findById(id) {
    return await this.driver.findElement(webdriver.By.id(id));
  }

  async findByClassName(className) {
    return await this.driver.findElement(webdriver.By.className(className));
  }

  async findByCSS(selector) {
    return await this.driver.findElement(webdriver.By.css(selector));
  }

  async findH1() {
    return await this.findByCSS('h1');
  }

  async findH2() {
    return await this.findByCSS('h2');
  }

  async getH1Text() {
    const h1Element = await this.findH1();
    return await h1Element.getText();
  }

  async getH2Text() {
    const h2Element = await this.findH2();
    return await h2Element.getText();
  }

  async waitForPageWithTitle(title) {
    return await this.driver.wait(webdriver.until.titleIs(title), DEFAULT_WAIT_MILLIS);
  }

  async waitForElement({ selector, type = 'CSS', timeout = DEFAULT_WAIT_MILLIS }) {
    const by = {
      'CSS': webdriver.By.css
    };

    return await this.driver.wait(webdriver.until.elementLocated(by[type](selector)), timeout);
  }

  async getPageError() {
    await this.waitForElement({ selector: ERROR_SELECTOR });
    return await this.findByCSS(ERROR_SELECTOR);
  }

  async getPageErrorText() {
    const pageError = await this.getPageError();
    return await pageError.getText();
  }
}

module.exports = Page;

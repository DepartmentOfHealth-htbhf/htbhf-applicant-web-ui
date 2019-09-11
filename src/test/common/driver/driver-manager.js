'use strict'

const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')

const { TEST_BROWSER, SCREEN_RESOLUTION, HEADLESS_BROWSER_TESTS } = require('../config')

class DriverManager {
  constructor () {
    this.driver = null
  }

  initialise () {
    if (HEADLESS_BROWSER_TESTS === 'true') {
      this.driver = new webdriver.Builder()
        .forBrowser(TEST_BROWSER)
        .setChromeOptions(new chrome.Options().addArguments('--no-sandbox', '--disable-dev-shm-usage').headless().windowSize(SCREEN_RESOLUTION))
        .setFirefoxOptions(new firefox.Options().headless().windowSize(SCREEN_RESOLUTION))
        .build()
    } else {
      this.driver = new webdriver.Builder()
        .forBrowser(TEST_BROWSER)
        .build()
    }

    return this.driver
  }

  quit (scenario) {
    this.driver.quit()
    this.afterQuit(scenario)
  }

  afterQuit (scenario) {
    // nothing to do
  }
}

module.exports = DriverManager

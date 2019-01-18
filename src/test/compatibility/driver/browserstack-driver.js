'use strict'

require('dotenv').config()

const request = require('request')
const DriverManager = require('../../common/driver/driver-manager')
const webdriver = require('selenium-webdriver')
const { Status } = require('cucumber')

const BROWSER_STACK_USER = process.env.BROWSER_STACK_USER
const BROWSER_STACK_KEY = process.env.BROWSER_STACK_KEY

const BROWSER_STACK_URL = 'https://hub-cloud.browserstack.com/wd/hub'

/**
 * Page object for the initial overview page that is shown when the app first loads.
 */
class BrowserstackDriver extends DriverManager {
  initialise () {
    this.driver = new webdriver.Builder()
      .withCapabilities({
        'browserName': process.env.BROWSER_STACK_BROWSER,
        'browser_version': process.env.BROWSER_STACK_BROWSER_VERSION,
        'os': process.env.BROWSER_STACK_OS,
        'os_version': process.env.BROWSER_STACK_OS_VERSION,
        // Ignored by desktop browsers
        'realMobile': 'true',
        'device': process.env.BROWSER_STACK_DEVICE,
        'browserstack.user': BROWSER_STACK_USER,
        'browserstack.key': BROWSER_STACK_KEY
      })
      .usingServer(BROWSER_STACK_URL)
      .build()

    const sessionData = this.driver.getSession()
    this.sessionID = sessionData.getId()

    return this.driver
  }

  afterQuit (scenario) {
    console.log(scenario)
    const name = scenario.name
    const status = (scenario.result.status === Status.PASSED) ? 'passed' : 'failed'

    request({
      uri: `https://${BROWSER_STACK_USER}:${BROWSER_STACK_KEY}@api.browserstack.com/automate/sessions/${this.sessionID}.json`,
      method: 'PUT',
      form: {
        name,
        status,
        'reason': ''
      }
    })
  }
}

module.exports = BrowserstackDriver

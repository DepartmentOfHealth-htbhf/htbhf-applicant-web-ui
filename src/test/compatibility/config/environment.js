/* eslint-disable no-process-env */
'use strict'

const { notIsNilOrEmpty } = require('../../../common/predicates')

require('dotenv').config()

const BROWSER_STACK_USER = process.env.BROWSER_STACK_USER
const BROWSER_STACK_KEY = process.env.BROWSER_STACK_KEY
// if we're provided with APP_BASE_URL we'll use that, otherwise we'll combine BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD & APP_HOST
const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME || ''
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD
const APP_HOST = process.env.APP_HOST
const APP_BASE_URL = process.env.APP_BASE_URL || ''

const BASIC_AUTH = BASIC_AUTH_USERNAME === '' ? '' : `${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}@`
const COMPATIBILITY_BASE_URL = APP_BASE_URL === '' ? `https://${BASIC_AUTH}${APP_HOST}` : `${APP_BASE_URL}`
const BROWSER_STACK_URL = 'https://hub-cloud.browserstack.com/wd/hub'

function isMobileDevice () {
  return !!process.env.BROWSER_STACK_DEVICE
}

function getBrowserVersion () {
  const browserVersion = process.env.BROWSER_STACK_BROWSER_VERSION
  if (notIsNilOrEmpty(browserVersion)) {
    return browserVersion
  }
  return isMobileDevice() ? '' : 'latest'
}

module.exports = {
  COMPATIBILITY_BASE_URL,
  BROWSER_STACK_USER,
  BROWSER_STACK_KEY,
  BROWSER_STACK_URL,
  getBrowserVersion
}

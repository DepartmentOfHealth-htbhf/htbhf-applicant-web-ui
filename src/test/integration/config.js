/* eslint-disable no-process-env */
'use strict'

require('dotenv').config()

// if we're provided with APP_BASE_URL we'll use that, otherwise we'll combine BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD & APP_HOST
const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME || ''
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD
const APP_HOST = process.env.APP_HOST
const APP_BASE_URL = process.env.APP_BASE_URL || ''

const BASIC_AUTH = BASIC_AUTH_USERNAME === '' ? '' : `${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}@`
module.exports.INTEGRATION_BASE_URL = APP_BASE_URL === '' ? `https://${BASIC_AUTH}${APP_HOST}` : `${APP_BASE_URL}`

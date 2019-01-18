/* eslint-disable no-process-env */
'use strict'

require('dotenv').config()

const APP_BASE_URL = process.env.APP_BASE_URL

module.exports.COMPATIBILITY_BASE_URL = `${APP_BASE_URL}`

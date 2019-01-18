/* eslint-disable no-process-env */
'use strict'

require('dotenv').config()

const APP_HOST = process.env.APP_HOST

module.exports.SMOKE_BASE_URL = APP_HOST

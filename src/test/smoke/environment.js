/* eslint-disable no-process-env */
'use strict'

const { APP_HOST, SCREEN_RESOLUTION } = require('../config')

const PUBLIC_BASE_URL = `https://${APP_HOST}`

module.exports = {
  PUBLIC_BASE_URL,
  SCREEN_RESOLUTION
}

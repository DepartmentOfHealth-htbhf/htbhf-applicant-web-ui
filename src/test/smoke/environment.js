/* eslint-disable no-process-env */
'use strict'

const { APP_HOST, SCREEN_RESOLUTION } = require('../common/config')

const PUBLIC_BASE_URL = `${APP_HOST}`

module.exports = {
  PUBLIC_BASE_URL,
  SCREEN_RESOLUTION
}

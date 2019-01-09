/* eslint-disable no-process-env */
'use strict'

require('dotenv').config()

module.exports.APP_PORT = process.env.APP_PORT
module.exports.APP_HOST = process.env.APP_HOST
module.exports.SCREEN_RESOLUTION = {
  width: 640,
  height: 480
}

/* eslint-disable no-process-env */
'use strict'

require('dotenv').config()

module.exports.PORT = process.env.PORT
module.exports.APP_HOST = process.env.APP_HOST
module.exports.SCREEN_RESOLUTION = {
  width: 640,
  height: 480
}

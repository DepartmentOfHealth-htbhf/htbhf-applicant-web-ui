'use strict'

require('dotenv').config()

const SESSION_DETAILS_PORT = process.env.SESSION_DETAILS_PORT || process.env.PORT
const SESSION_DETAILS_BASE_URL = process.env.SESSION_DETAILS_BASE_URL || `http://localhost:${SESSION_DETAILS_PORT}`
const SESSION_DETAILS_PATH = '/session-details/confirmation-code'

module.exports.SESSION_DETAILS_PORT = SESSION_DETAILS_PORT
module.exports.SESSION_DETAILS_PATH = SESSION_DETAILS_PATH
module.exports.SESSION_CONFIRMATION_CODE_URL = `${SESSION_DETAILS_BASE_URL}${SESSION_DETAILS_PATH}`

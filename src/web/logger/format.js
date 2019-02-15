const { format } = require('winston')
const { pathOr } = require('ramda')
const { printf } = format

const SESSION_ID_PATH = ['sessionID']
const REQUEST_ID_PATH = ['headers', 'X-Request-ID']

const pathOrEmpty = pathOr('')
const sessionIDPath = pathOrEmpty(SESSION_ID_PATH)
const requestIdPath = pathOrEmpty(REQUEST_ID_PATH)

const logFormatter = ({ level, message, timestamp, req }) =>
  `${timestamp} ${level.toUpperCase()} [${sessionIDPath(req)}][${requestIdPath(req)}] ${message}`

const formatLog = printf(logFormatter)

module.exports = {
  logFormatter,
  formatLog
}

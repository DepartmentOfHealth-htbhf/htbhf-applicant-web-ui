const { createLogger, format, transports } = require('winston')
const config = require('../../config')
const { formatLog } = require('./format')

const { combine, timestamp } = format

const TIMESTAMP_FORMAT = 'HH:mm:ss.SSS'

const logger = (req) => createLogger({
  level: config.environment.LOG_LEVEL,
  format: combine(
    timestamp({
      format: TIMESTAMP_FORMAT
    }),
    formatLog(req)
  ),
  transports: [
    new transports.Console()
  ]
})

module.exports = {
  logger
}

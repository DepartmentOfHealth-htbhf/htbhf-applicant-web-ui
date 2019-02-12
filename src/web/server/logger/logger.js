const { createLogger, format, transports } = require('winston')
const { logFormat } = require('./format')

const { combine, timestamp } = format

const TIMESTAMP_FORMAT = 'HH:mm:ss.SSS'
const LOG_LEVEL = 'info'

const logger = createLogger({
  level: LOG_LEVEL,
  format: combine(
    timestamp({
      format: TIMESTAMP_FORMAT
    }),
    logFormat
  ),
  transports: [
    new transports.Console()
  ]
})

module.exports = {
  logger
}

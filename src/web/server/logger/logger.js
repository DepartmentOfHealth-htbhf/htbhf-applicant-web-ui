const { createLogger, format, transports } = require('winston')
const config = require('../../../config')
const { logFormat } = require('./format')

const { combine, timestamp } = format

const TIMESTAMP_FORMAT = 'HH:mm:ss.SSS'

const logger = createLogger({
  level: config.environment.UI_LOG_LEVEL,
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

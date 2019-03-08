const { createLogger, format, transports } = require('winston')
const config = require('../../config')
const { formatLog } = require('./format')

const { combine, timestamp } = format

const TIMESTAMP_FORMAT = 'HH:mm:ss.SSS'

const logger = createLogger({
  level: config.environment.LOG_LEVEL,
  format: combine(
    timestamp({
      format: TIMESTAMP_FORMAT
    }),
    formatLog
  ),
  transports: [
    new transports.Console({
      silent: config.environment.LOG_LEVEL === 'silent'
    })
  ]
})

module.exports = {
  logger
}

const { format } = require('winston')
const { printf } = format

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level.toUpperCase()} ${message}`
})

module.exports = {
  logFormat
}

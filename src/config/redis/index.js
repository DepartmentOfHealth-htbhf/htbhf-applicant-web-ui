const { parseRedisConfig } = require('./redis')
const defaultConfig = {
  port: process.env.REDIS_PORT || '6379',
  host: process.env.REDIS_HOST || '127.0.0.1'
}

module.exports = parseRedisConfig(defaultConfig, process.env.VCAP_SERVICES)

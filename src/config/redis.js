const { getRedisCredentials } = require('./vcap-services')

const defaultConfig = {
  port: process.env.REDIS_PORT || '6379',
  host: process.env.REDIS_HOST || '127.0.0.1'
}

const getRedisConfig = () => {
  const config = getRedisCredentials()
  config.tls = { rejectUnauthorized: false }
  return config
}

const config = process.env.VCAP_SERVICES ? getRedisConfig() : defaultConfig

module.exports = config

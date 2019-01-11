const hasRedisCredentials = (obj) => {
  return !!obj.redis &&
    obj.redis.length > 0 &&
    !!obj.redis[0].credentials
}

const parseRedisConfig = (defaultConfig, vcapServices) => {
  const redisConfig = { ...defaultConfig }

  if (typeof vcapServices === 'string' && vcapServices.length > 0) {
    const vcap = JSON.parse(vcapServices)
    if (hasRedisCredentials(vcap)) {
      const credentials = vcap.redis[0].credentials
      for (var k in credentials) {
        redisConfig[k] = credentials[k]
      }
      redisConfig.tls = { rejectUnauthorized: false }
    }
  }
  return redisConfig
}

module.exports = { parseRedisConfig }

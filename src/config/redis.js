const vcapServices = process.env.VCAP_SERVICES
const redis = {
  port: process.env.REDIS_PORT || '6379',
  host: process.env.REDIS_HOST || '127.0.0.1'
}

/* pretty sure there's a better way of doing this */
if (typeof vcapServices === 'string' && vcapServices.length > 0) {
  const vcap = JSON.parse(vcapServices)
  if (!!vcap.redis && !!vcap.redis[0].credentials) {
    const cred = vcap.redis[0].credentials
    for (var k in cred) {
      redis[k] = cred[k]
    }
    redis.tls = { rejectUnauthorized: false }
  }
}

module.exports = redis

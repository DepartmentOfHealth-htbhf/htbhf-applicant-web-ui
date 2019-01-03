const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')

const { initialiseSession } = require('./session')

module.exports = {
  initialiseSession: initialiseSession(
    redis.createClient(),
    new RedisStore()
  )
}

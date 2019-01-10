const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const httpStatus = require('http-status-codes')
const { path } = require('ramda')

const onClientError = (error) => {
  console.log('Error with redis session:', error)
}

const onClientConnection = (callback) => () => {
  console.log('Redis client connected')
  callback()
}

/**
 * By default the node_redis client will auto-reconnect when a connection is lost
 * but requests may come in during that time.
 */
const ensureSession = (req, res, next) => {
  if (!req.session) {
    const err = new Error('Error with session')
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    return next(err)
  }
  next()
}

const getSessionConfig = (store, config) => {
  const sessionConfig = {
    store,
    secret: config.server.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: config.server.SESSION_ID_NAME,
    cookie: {
      secure: true
    }
  }

  if (path(['environment', 'USE_UNSECURE_COOKIE'], config) === true) {
    sessionConfig.cookie.secure = false
  }

  return sessionConfig
}

const initialiseSession = (onConnectCallback, config, app) => {
  const client = redis.createClient(config.redis)
  const store = new RedisStore()
  const sessionConfig = getSessionConfig(store, config)

  app.use(session(sessionConfig))
  app.use(ensureSession)

  client.on('connect', onClientConnection(onConnectCallback))
  client.on('error', onClientError)
}

module.exports = {
  ensureSession,
  getSessionConfig,
  initialiseSession
}

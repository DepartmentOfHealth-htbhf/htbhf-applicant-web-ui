const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const httpStatus = require('http-status-codes')
const { path } = require('ramda')
const { logger } = require('../../logger')

const onClientError = (error) => {
  logger.error(`Error with redis session: ${error}`)
}

const onClientConnection = (callback) => () => {
  logger.info('Redis client connected')
  callback()
}

/**
 * By default the node_redis client will auto-reconnect when a connection is lost
 * but requests may come in during that time.
 */
const ensureSession = (req, res, next) => {
  if (!req.session) {
    const err = new Error('No session found')
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    return next(err)
  }
  next()
}

const getSessionConfig = (store, config) => {
  const sessionConfig = {
    store: store,
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

  logger.info(`Using secure cookie: ${sessionConfig.cookie.secure}`)

  return sessionConfig
}

const initialiseSession = (onConnectCallback, config, app) => {
  const client = redis.createClient(config.redis)
  const store = new RedisStore({ client })
  const sessionConfig = getSessionConfig(store, config)

  if (sessionConfig.cookie.secure) {
    app.set('trust proxy', 1) // trust first proxy
  }
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

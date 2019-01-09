const session = require('express-session')
const httpStatus = require('http-status-codes')

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
      secure: false
    }
  }

  if (config.environment.NODE_ENV === 'production') {
    sessionConfig.cookie.secure = true
  }

  return sessionConfig
}

const initialiseSession = (client, store) => (onConnectCallback, config, app) => {
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

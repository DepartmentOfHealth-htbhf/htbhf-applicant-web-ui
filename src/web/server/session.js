const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')

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
    res.status(500)
    return next(new Error('Session is not initialised'))
  }
  next()
}

const initialiseSession = (client) => (onConnectCallback, config, app) => {
  const sessionConfig = {
    store: new RedisStore(),
    secret: config.server.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: config.server.SESSION_ID_NAME
  }

  if (config.environment.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
    sessionConfig.cookie.secure = true
  }

  app.use(session(sessionConfig))
  app.use(ensureSession)

  client.on('connect', onClientConnection(onConnectCallback))
  client.on('error', onClientError)
}

module.exports = {
  initialiseSession: initialiseSession(redis.createClient())
}

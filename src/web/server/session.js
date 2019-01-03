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
  const configuration = {
    store: new RedisStore(),
    secret: config.server.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: config.server.SESSION_ID_NAME
  }

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    configuration.cookie.secure = true
  }

  app.use(session(configuration))
  app.use(ensureSession)

  client.on('connect', onClientConnection(onConnectCallback))
  client.on('error', onClientError)
}

module.exports = {
  initialiseSession: initialiseSession(redis.createClient())
}

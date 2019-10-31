const express = require('express')
const { logger } = require('../../web/logger')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const config = require('../../config')
const app = express()
const { COOKIE_EXPIRES_MILLISECONDS } = require('../../web/server/session/cookie-settings')
const { CONFIRMATION_CODE_SESSION_PROPERTY } = require('../../web/routes/application/steps/common/constants')
const { SESSION_DETAILS_PORT, SESSION_DETAILS_PATH } = require('./constants')

const client = redis.createClient(config.redis)
const store = new RedisStore({ client })
const sessionConfig = {
  store: store,
  secret: config.server.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name: config.server.SESSION_ID_NAME,
  cookie: {
    secure: true,
    maxAge: COOKIE_EXPIRES_MILLISECONDS
  }
}
app.set('trust proxy', 1) // trust first proxy
app.use(session(sessionConfig))

logger.info('config:' + JSON.stringify(config))

const handleConfirmationCode = (req, res) => {
  const confirmationCode = req.session[CONFIRMATION_CODE_SESSION_PROPERTY]
  logger.info(`Confirmation code for request with cookies '${JSON.stringify(req.headers.cookie)}' is ${confirmationCode}`)
  res.send(confirmationCode)
}

const server = app.listen(SESSION_DETAILS_PORT, () => {
  logger.info(`Session Details App listening on port ${SESSION_DETAILS_PORT}`)
  app.get(SESSION_DETAILS_PATH, handleConfirmationCode)
})

process.on('SIGTERM', () => {
  server.close(() => {
    logger.info('Session Details App closed.')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  server.close(() => {
    logger.info('Session Details App closed.')
    process.exit(0)
  })
})

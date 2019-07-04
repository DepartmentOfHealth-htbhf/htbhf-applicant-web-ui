const express = require('express')
const { logger } = require('../../web/logger')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const config = require('../../config')
const port = process.env.SESSION_DETAILS_PORT || process.env.PORT
const app = express()
const { COOKIE_EXPIRES_MILLISECONDS } = require('../../web/server/session/cookie-settings')
const { CONFIRMATION_CODE_SESSION_PROPERTY } = require('../../web/routes/application/common/constants')

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

const server = app.listen(port, () => {
  logger.info(`Session Details App listening on port ${port}`)
  app.get('/confirmation-code', (req, res) => res.send(req.session[CONFIRMATION_CODE_SESSION_PROPERTY]))
})

process.on('SIGTERM', () => {
  server.close(() => {
    logger.info('Session Details App closed.')
    process.exit(0)
  })
})

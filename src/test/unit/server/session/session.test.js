const test = require('tape')
var colorize = require('tap-colorize')

test.createStream().pipe(colorize()).pipe(process.stdout)

const { ensureSession, getSessionConfig } = require('../../../../web/server/session/session')

test('ensureSession', (t) => {
  const reqWithoutSession = {}
  const reqWithSession = { session: {} }
  const res = {}
  const next = () => {}

  t.throws(
    ensureSession.bind(null, reqWithoutSession, res, next),
    Error,
    'It should throw an error if session does not exist'
  )

  t.doesNotThrow(
    ensureSession.bind(null, reqWithSession, res, next),
    null,
    'It should not throw an error if session does not exist'
  )

  t.end()
})

test('getSessionConfig', (t) => {
  const store = 'store'

  const configDevelopment = {
    server: {
      SESSION_SECRET: 'password123',
      SESSION_ID_NAME: 'session.sid'
    },
    environment: {
      NODE_ENV: 'development'
    }
  }

  const configProduction = {
    ...configDevelopment,
    environment: {
      NODE_ENV: 'production'
    }
  }

  const expectedDevelopment = {
    store: 'store',
    secret: 'password123',
    saveUninitialized: false,
    resave: false,
    name: 'session.sid',
    cookie: {
      secure: false
    }
  }

  const expectedProduction = {
    ...expectedDevelopment,
    cookie: {
      secure: true
    }
  }

  const resultDevelopment = getSessionConfig(store, configDevelopment)
  const resultProduction = getSessionConfig(store, configProduction)

  t.deepEqual(
    expectedDevelopment,
    resultDevelopment,
    'it should return the correct session configuration for development environment'
  )

  t.deepEqual(
    expectedProduction,
    resultProduction,
    'it should return the correct session configuration for production environment'
  )

  t.end()
})

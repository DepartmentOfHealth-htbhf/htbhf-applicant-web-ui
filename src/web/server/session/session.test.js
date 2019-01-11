const test = require('tape')
const sinon = require('sinon')

const { ensureSession, getSessionConfig } = require('./session')

test('ensureSession should throw an error if session does not exist', (t) => {
  const req = {}
  const res = {}
  const next = sinon.spy()

  ensureSession(req, res, next)

  t.equal(
    next.calledWith(sinon.match.instanceOf(Error)),
    true,
    'It should throw an error if session does not exist'
  )

  t.end()
})

test('ensureSession should not throw an error if session does not exist', (t) => {
  const req = { session: {} }
  const res = {}
  const next = sinon.spy()

  ensureSession(req, res, next)

  t.equal(
    next.calledWith(),
    true,
    'It should throw an error if session does not exist'
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
      USE_UNSECURE_COOKIE: true
    }
  }

  const configProduction = {
    server: {
      SESSION_SECRET: 'password123',
      SESSION_ID_NAME: 'session.sid'
    }
  }

  const expectedLocal = {
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
    ...expectedLocal,
    cookie: {
      secure: true
    }
  }

  const resultDevelopment = getSessionConfig(store, configDevelopment)
  const resultProduction = getSessionConfig(store, configProduction)

  t.deepEqual(
    expectedLocal,
    resultDevelopment,
    'it should return the correct session configuration for local environment'
  )

  t.deepEqual(
    expectedProduction,
    resultProduction,
    'it should return the correct session configuration for non-local environment'
  )

  t.end()
})

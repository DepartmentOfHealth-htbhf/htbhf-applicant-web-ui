const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const states = require('./states')
const actions = require('./actions')
const { CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('../../paths')

const info = sinon.spy()
const logger = { info }

const { stateMachine, isPathAllowed } = proxyquire('./state-machine', {
  '../../../../logger': { logger }
})

const { GET_NEXT_PATH, INVALIDATE_REVIEW, SET_NEXT_ALLOWED_PATH, INCREMENT_NEXT_ALLOWED_PATH } = actions

const steps = [
  { path: '/first', next: () => '/second' },
  { path: '/second', next: () => '/third' },
  { path: '/third', isNavigable: () => false, next: () => '/fourth' }
]
const paths = ['/first', '/second', '/third', '/fourth']

test(`Dispatching ${GET_NEXT_PATH} should return next property of associated step when no state defined in session`, async (t) => {
  const req = { method: 'POST', session: {}, path: '/first' }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, steps), '/second')
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return should return next property of associated step when state of ${states.IN_PROGRESS} defined in session`, async (t) => {
  const req = { method: 'POST', session: { state: states.IN_PROGRESS }, path: '/first' }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, steps), '/second')
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return next navigable path when state of ${states.IN_PROGRESS} defined in session and next step is not navigable`, async (t) => {
  const req = { method: 'POST', session: { state: states.IN_PROGRESS }, path: '/second' }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, steps), '/fourth')
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return ${CHECK_ANSWERS_URL} path when state of ${states.IN_REVIEW} defined in session`, async (t) => {
  const req = { method: 'POST', session: { state: states.IN_REVIEW }, path: '/first' }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, steps), CHECK_ANSWERS_URL)
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return /terms-and-conditions when state of ${states.IN_REVIEW} and current path is ${CHECK_ANSWERS_URL}`, async (t) => {
  const req = { method: 'POST', session: { state: states.IN_REVIEW }, path: CHECK_ANSWERS_URL }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, steps), TERMS_AND_CONDITIONS_URL)
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return confirm path when state of ${states.COMPLETED} defined in session`, async (t) => {
  const req = { method: 'POST', session: { state: states.COMPLETED }, path: '/first' }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, steps), CONFIRM_URL)
  t.end()
})

test(`Dispatching an invalid action should return null`, async (t) => {
  const req = { method: 'POST', session: {}, path: '/first' }

  t.equal(stateMachine.dispatch('INVALID_ACTION', req, steps), null)
  t.end()
})

test('isPathAllowed() should return true if path is before allowed in sequence', (t) => {
  const result = isPathAllowed(paths, '/third', '/second')
  t.equal(result, true, 'returns true if path is before allowed in sequence')
  t.end()
})

test('isPathAllowed() should return true if path matches allowed', (t) => {
  const result = isPathAllowed(paths, '/third', '/third')
  t.equal(result, true, 'returns true if path matches allowed')
  t.end()
})

test('isPathAllowed() should return false if path is after allowed in sequence', (t) => {
  const result = isPathAllowed(paths, '/third', '/fourth')
  t.equal(result, false, 'returns false if path is after allowed in sequence')
  t.end()
})

test(`Dispatching ${INVALIDATE_REVIEW} should set state to ${states.IN_PROGRESS} when session.state is ${states.IN_REVIEW}`, async (t) => {
  const req = { method: 'POST', session: { state: states.IN_REVIEW }, path: '/first' }

  stateMachine.dispatch(INVALIDATE_REVIEW, req)

  t.equal(req.session.state, states.IN_PROGRESS, `sets state to ${states.IN_PROGRESS}`)
  t.end()
})

test(`Dispatching ${INVALIDATE_REVIEW} should not update state when session.state is not ${states.IN_REVIEW}`, async (t) => {
  [states.IN_PROGRESS, states.COMPLETED].forEach(state => {
    const req = { method: 'POST', session: { state }, path: '/first' }
    stateMachine.dispatch(INVALIDATE_REVIEW, req)
    t.equal(req.session.state, state, `does not update state for ${state}`)
  })

  t.end()
})

test('setState does not log a change in state if the new state is the same as the current state', (t) => {
  info.resetHistory()
  const req = {
    session: {
      state: states.IN_PROGRESS
    }
  }

  stateMachine.setState(states.IN_PROGRESS, req)

  t.equal(info.called, false, 'Should not log a change in state')
  t.end()
})

test('setState sets the state if the new state is different from the current state', (t) => {
  info.resetHistory()
  const req = {
    session: {
      state: states.IN_PROGRESS
    }
  }

  stateMachine.setState(states.COMPLETED, req)

  t.equal(req.session.state, states.COMPLETED, 'Should set state')
  t.equal(info.called, true, 'Should log a change in state')
  t.end()
})

test(`Dispatching ${SET_NEXT_ALLOWED_PATH} sets next allowed path in session`, (t) => {
  const appStates = [
    { state: states.IN_PROGRESS, path: '/name' },
    { state: states.IN_REVIEW, path: '/check' },
    { state: states.COMPLETED, path: '/success' }
  ]

  appStates.forEach(appState => {
    const { state, path } = appState

    const req = {
      session: {
        state
      }
    }

    stateMachine.dispatch(SET_NEXT_ALLOWED_PATH, req, path)
    t.equal(req.session.nextAllowedStep, path, `sets next allowed path in session for ${state}`)
  })

  t.end()
})

test(`Dispatching ${INCREMENT_NEXT_ALLOWED_PATH} updates next allowed step in session with the next allowed path in sequence`, (t) => {
  const appStates = [
    { state: states.IN_PROGRESS, path: '/first', expectedNextPath: '/second' },
    { state: states.IN_REVIEW, path: CHECK_ANSWERS_URL, expectedNextPath: TERMS_AND_CONDITIONS_URL },
    { state: states.COMPLETED, path: CONFIRM_URL, expectedNextPath: CONFIRM_URL }
  ]

  appStates.forEach(appState => {
    const { state, path, expectedNextPath } = appState

    const req = {
      path,
      session: {
        state
      }
    }

    stateMachine.dispatch(INCREMENT_NEXT_ALLOWED_PATH, req, steps)
    t.equal(req.session.nextAllowedStep, expectedNextPath, `increments next allowed path in session for ${state}`)
  })

  t.end()
})

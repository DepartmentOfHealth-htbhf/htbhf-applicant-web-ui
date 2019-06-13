const test = require('tape')
const { stateMachine, states, actions, isPathAllowed } = require('./state-machine')
const { CHECK_URL, CONFIRM_URL } = require('../../common/constants')

const { GET_NEXT_PATH } = actions

const steps = [{ path: '/first', next: '/second' }, { path: '/second' }]
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

test(`Dispatching ${GET_NEXT_PATH} should return check path when state of ${states.IN_REVIEW} defined in session`, async (t) => {
  const req = { method: 'POST', session: { state: states.IN_REVIEW }, path: '/first' }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, steps), CHECK_URL)
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
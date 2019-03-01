const test = require('tape')
const { stateMachine, states, actions } = require('./state-machine')
const { CHECK_URL } = require('../../common/constants')

const { GET_NEXT_PATH } = actions

const steps = [{ path: '/first', next: '/second' }, { path: '/second' }]

test(`Dispatching ${GET_NEXT_PATH} should return next property of associated step when no state defined in session`, async (t) => {
  const req = { method: 'POST', session: {} }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, steps, '/first'), '/second')
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return should return next property of associated step when state of IN_PROGRESS defined in session`, async (t) => {
  const req = { method: 'POST', session: { state: states.IN_PROGRESS } }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, steps, '/first'), '/second')
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return check path when state of IN_REVIEW defined in session`, async (t) => {
  const req = { method: 'POST', session: { state: states.IN_REVIEW } }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, steps, '/first'), CHECK_URL)
  t.end()
})

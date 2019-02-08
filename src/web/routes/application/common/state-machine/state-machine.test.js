const test = require('tape')
const { stateMachine, states, actions } = require('./state-machine')
const { CHECK_URL } = require('../../constants')

test('dispatch() should redirect to given page when no state defined in session', async (t) => {
  const req = { method: 'POST', session: {} }

  t.equal(stateMachine.dispatch(actions.GET_NEXT_PAGE, req, '/mynextpage'), '/mynextpage')
  t.end()
})

test('dispatch() should redirect to given page when state of IN_PROGRESS defined in session', async (t) => {
  const req = { method: 'POST', session: { state: states.IN_PROGRESS } }

  t.equal(stateMachine.dispatch(actions.GET_NEXT_PAGE, req, '/mynextpage'), '/mynextpage')
  t.end()
})

test('dispatch() should redirect to check page when state of IN_REVIEW defined in session', async (t) => {
  const req = { method: 'POST', session: { state: states.IN_REVIEW } }

  t.equal(stateMachine.dispatch(actions.GET_NEXT_PAGE, req, '/mynextpage'), CHECK_URL)
  t.end()
})

const test = require('tape')
const sinon = require('sinon')
const { stateMachine, states } = require('./state-machine')
const { CHECK_URL } = require('../../constants')

test('dispatch() redirect to given page when no state defined in session', async (t) => {
  const redirect = sinon.spy()
  const req = { method: 'POST', session: {} }

  const res = {
    redirect,
    locals: {}
  }

  stateMachine.dispatch(req, res, '/mynextpage')

  t.equal(redirect.called, true)
  t.equal(redirect.calledWith('/mynextpage'), true)
  t.end()
})

test('dispatch() redirect to check page when state of IN_REVIEW defined in session', async (t) => {
  const redirect = sinon.spy()
  const req = { method: 'POST', session: { state: states.IN_REVIEW } }

  const res = {
    redirect,
    locals: {}
  }

  stateMachine.dispatch(req, res, '/mynextpage')

  t.equal(redirect.called, true)
  t.equal(redirect.calledWith(CHECK_URL), true)
  t.end()
})

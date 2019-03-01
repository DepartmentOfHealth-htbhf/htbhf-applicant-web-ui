const test = require('tape')
const sinon = require('sinon')
const { CHECK_URL } = require('../common/constants')
const { getPathsInSequence, handlePathRequest } = require('./handle-path-request')

const steps = [{ path: '/first', next: '/second' }, { path: '/second' }]

test('getPathsInSequence() returns the correct sequence of paths', (t) => {
  const expected = ['/first', '/second', CHECK_URL]
  const result = getPathsInSequence(steps)

  t.deepEqual(result, expected, 'returns the correct sequence of paths')
  t.end()
})

test('handlePathRequest() should set next allowed path to first in sequence if none exists on session', (t) => {
  const req = {
    session: {}
  }

  const res = {}
  const next = sinon.spy()

  handlePathRequest(steps)(req, res, next)

  t.equal(req.session.nextAllowedStep, '/first', 'should set next allowed path to first in sequence')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

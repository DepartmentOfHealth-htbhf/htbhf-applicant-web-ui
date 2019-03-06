const test = require('tape')
const sinon = require('sinon')
const { CHECK_URL, CONFIRM_URL } = require('../common/constants')
const { getPathsInSequence, handleRequestForPath } = require('./handle-path-request')

const steps = [{ path: '/first', next: '/second' }, { path: '/second' }]

test('getPathsInSequence() returns the correct sequence of paths', (t) => {
  const expected = ['/first', '/second', CHECK_URL, CONFIRM_URL]
  const result = getPathsInSequence(steps)

  t.deepEqual(result, expected, 'returns the correct sequence of paths')
  t.end()
})

test('handleRequestForPath() should set next allowed path to first in sequence if none exists on session', (t) => {
  const req = {
    session: {}
  }

  const res = {}
  const next = sinon.spy()

  handleRequestForPath(steps)(req, res, next)

  t.equal(req.session.nextAllowedStep, '/first', 'it should set next allowed path to first in sequence')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

test('handleRequestForPath() should redirect to next allowed step if requested path is not allowed', (t) => {
  const req = {
    path: '/second',
    session: {
      nextAllowedStep: '/first'
    }
  }

  const redirect = sinon.spy()
  const res = { redirect }
  const next = sinon.spy()

  handleRequestForPath(steps)(req, res, next)

  t.equal(redirect.calledWith('/first'), true, 'it should call redirect() with next allowed step')
  t.equal(next.called, false, 'it should not call next()')
  t.end()
})

test('handleRequestForPath() should call next() if requested path is allowed', (t) => {
  const req = {
    path: '/second',
    session: {
      nextAllowedStep: '/second'
    }
  }

  const redirect = sinon.spy()
  const res = { redirect }
  const next = sinon.spy()

  handleRequestForPath(steps)(req, res, next)

  t.equal(redirect.called, false, 'it should not call redirect()')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

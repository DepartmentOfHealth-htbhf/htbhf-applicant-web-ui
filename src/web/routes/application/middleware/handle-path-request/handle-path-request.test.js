const test = require('tape')
const sinon = require('sinon')
const { CHECK_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('../../common/constants')
const { getPathsInSequence, handleRequestForPath, isPathInSequence } = require('./handle-path-request')
const { states } = require('../../common/state-machine')

const steps = [{ path: '/first', next: () => '/second' }, { path: '/second' }]

const config = {
  environment: {
    OVERVIEW_URL: '/'
  }
}

test('isPathInSequence()', (t) => {
  const sequence = ['/first', '/second', '/third']
  t.equal(isPathInSequence('/second', sequence), true, 'returns true for a path in the sequence')
  t.equal(isPathInSequence('/not-in-sequence', sequence), false, 'returns false for a path not in the sequence')
  t.end()
})

test('getPathsInSequence() returns the correct sequence of paths', (t) => {
  const expected = ['/first', '/second', CHECK_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL]
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

  handleRequestForPath(config, steps)(req, res, next)

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

  handleRequestForPath(config, steps)(req, res, next)

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

  handleRequestForPath(config, steps)(req, res, next)

  t.equal(redirect.called, false, 'it should not call redirect()')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

test(`handleRequestForPath() should destroy the session and redirect to root when navigating away from ${CONFIRM_URL} to a path in sequence`, (t) => {
  const destroy = sinon.spy()
  const clearCookie = sinon.spy()
  const redirect = sinon.spy()
  const next = sinon.spy()

  const req = {
    path: '/second',
    session: {
      destroy,
      state: states.COMPLETED
    }
  }

  const res = {
    clearCookie,
    redirect
  }

  handleRequestForPath(config, steps)(req, res, next)

  t.equal(destroy.called, true, 'it should destroy the session')
  t.equal(clearCookie.calledWith('lang'), true, 'it should clear language preference cookie')
  t.equal(redirect.calledWith('/'), true, 'it should call redirect() with correct path')
  t.end()
})

test(`handleRequestForPath() should destroy the session when navigating away from ${CONFIRM_URL} to a path not in sequence`, (t) => {
  const destroy = sinon.spy()
  const clearCookie = sinon.spy()
  const redirect = sinon.spy()
  const next = sinon.spy()

  const req = {
    path: '/what-you-get',
    session: {
      destroy,
      state: states.COMPLETED
    }
  }

  const res = {
    clearCookie,
    redirect
  }

  handleRequestForPath(config, steps)(req, res, next)

  t.equal(destroy.called, true, 'it should destroy the session')
  t.equal(clearCookie.calledWith('lang'), true, 'it should clear language preference cookie')
  t.equal(next.called, true, 'it should call next()')
  t.equal(redirect.called, false, 'it should not call redirect()')
  t.end()
})

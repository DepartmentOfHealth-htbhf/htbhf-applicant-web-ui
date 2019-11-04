const test = require('tape')
const sinon = require('sinon')
const { CONFIRM_URL } = require('../../../paths')
const { handleRequestForPath } = require('./handle-path-request')
const { states } = require('../../state-machine')

const journey = {
  steps: [{ path: '/first', next: () => '/second' }, { path: '/second' }],
  pathsInSequence: ['/first', '/second']
}

const config = {
  environment: {
    OVERVIEW_URL: '/'
  }
}

test('handleRequestForPath() should set next allowed path to first in sequence if none exists on session', (t) => {
  const req = {
    session: {}
  }

  const res = {}
  const next = sinon.spy()

  handleRequestForPath(config, journey)(req, res, next)

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

  handleRequestForPath(config, journey)(req, res, next)

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

  handleRequestForPath(config, journey)(req, res, next)

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

  handleRequestForPath(config, journey)(req, res, next)

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

  handleRequestForPath(config, journey)(req, res, next)

  t.equal(destroy.called, true, 'it should destroy the session')
  t.equal(clearCookie.calledWith('lang'), true, 'it should clear language preference cookie')
  t.equal(next.called, true, 'it should call next()')
  t.equal(redirect.called, false, 'it should not call redirect()')
  t.end()
})

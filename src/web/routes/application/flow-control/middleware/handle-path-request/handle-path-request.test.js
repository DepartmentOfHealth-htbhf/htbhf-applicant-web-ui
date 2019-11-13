const test = require('tape')
const sinon = require('sinon')
const { CONFIRM_URL } = require('../../../paths')
const { handleRequestForPath } = require('./handle-path-request')
const { states, testUtils } = require('../../state-machine')

const { IN_PROGRESS, COMPLETED } = states
const { buildSessionForJourney } = testUtils

const APPLY = 'apply'

const journey = {
  name: APPLY,
  steps: [{ path: '/first', next: () => '/second' }, { path: '/second' }],
  pathsInSequence: ['/first', '/second']
}

test('handleRequestForPath() should redirect to next allowed step if requested path is not allowed', (t) => {
  const req = {
    path: '/second',
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_PROGRESS, nextAllowedPath: '/first' })
    }
  }

  const redirect = sinon.spy()
  const res = { redirect }
  const next = sinon.spy()

  handleRequestForPath(journey)(req, res, next)

  t.equal(redirect.calledWith('/first'), true, 'it should call redirect() with next allowed step')
  t.equal(next.called, false, 'it should not call next()')
  t.end()
})

test('handleRequestForPath() should call next() if requested path is allowed', (t) => {
  const req = {
    path: '/second',
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_PROGRESS, nextAllowedPath: '/second' })
    }
  }

  const redirect = sinon.spy()
  const res = { redirect }
  const next = sinon.spy()

  handleRequestForPath(journey)(req, res, next)

  t.equal(redirect.called, false, 'it should not call redirect()')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

test(`handleRequestForPath() should destroy the session and redirect to first step in journey when navigating away from ${CONFIRM_URL} to a path in sequence`, (t) => {
  const destroy = sinon.spy()
  const clearCookie = sinon.spy()
  const redirect = sinon.spy()
  const next = sinon.spy()

  const req = {
    path: '/second',
    session: {
      destroy,
      ...buildSessionForJourney({ journeyName: APPLY, state: COMPLETED })
    }
  }

  const res = {
    clearCookie,
    redirect
  }

  handleRequestForPath(journey)(req, res, next)

  t.equal(destroy.called, true, 'it should destroy the session')
  t.equal(clearCookie.calledWith('lang'), true, 'it should clear language preference cookie')
  t.equal(redirect.calledWith('/first'), true, 'it should call redirect() with correct path')
  t.end()
})

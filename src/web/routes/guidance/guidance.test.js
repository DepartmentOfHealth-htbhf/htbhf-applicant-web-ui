const test = require('tape')
const sinon = require('sinon')
const { states } = require('../application/common/state-machine')
const { handleSession } = require('./guidance')

test(`handleSession() destroys session if journey state is ${states.COMPLETED}`, (t) => {
  const destroy = sinon.spy()
  const clearCookie = sinon.spy()
  const next = sinon.spy()

  const req = {
    path: '/second',
    session: {
      destroy,
      state: states.COMPLETED
    }
  }

  const res = {
    clearCookie
  }

  handleSession(req, res, next)

  t.equal(destroy.called, true, 'it should destroy the session')
  t.equal(clearCookie.calledWith('lang'), true, 'it should clear language preference cookie')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

test(`handleSession() does not destroy session if journey state is not ${states.COMPLETED}`, (t) => {
  const destroy = sinon.spy()
  const clearCookie = sinon.spy()
  const next = sinon.spy()

  const req = {
    path: '/second',
    session: {
      destroy,
      state: states.IN_PROGRESS
    }
  }

  const res = {
    clearCookie
  }

  handleSession(req, res, next)

  t.equal(destroy.called, false, 'it should not destroy the session')
  t.equal(clearCookie.called, false, 'it should not clear language preference cookie')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

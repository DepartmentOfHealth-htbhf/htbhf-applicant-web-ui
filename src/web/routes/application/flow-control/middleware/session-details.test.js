const test = require('tape')
const sinon = require('sinon')
const { states } = require('../state-machine')
const { getSessionDetails } = require('./session-details')

const apply = {
  name: 'apply',
  pathsInSequence: ['/first', '/second']
}

const reportChange = {
  name: 'report-a-change',
  pathsInSequence: ['/one', '/two']
}

test('getSessionDetails() sets claim on res.locals', (t) => {
  const journey = apply

  const req = {
    session: {
      claim: {
        name: 'Lisa'
      }
    }
  }

  const res = { locals: {} }
  const next = sinon.stub()

  const expectedLocals = {
    claim: {
      name: 'Lisa'
    }
  }

  getSessionDetails(journey)(req, res, next)
  t.deepEqual(res.locals, expectedLocals, 'sets claim on res.locals')
  t.equal(next.called, true, 'calls next()')
  t.end()
})

test('getSessionDetails() initialises journey in session when session.journeys is undefined', (t) => {
  const journey = apply
  const req = { session: {} }
  const res = { locals: {} }
  const next = sinon.stub()

  const expectedSession = {
    journeys: {
      apply: {
        nextAllowedStep: '/first',
        state: states.IN_PROGRESS
      }
    }
  }

  getSessionDetails(journey)(req, res, next)
  t.deepEqual(req.session, expectedSession, 'initialises journey in session')
  t.equal(next.called, true, 'calls next()')
  t.end()
})

test('getSessionDetails() initialises journey in session when session.journeys is defined', (t) => {
  const journey = reportChange

  const req = {
    session: {
      journeys: {
        apply
      }
    }
  }

  const res = { locals: {} }
  const next = sinon.stub()

  const expectedSession = {
    journeys: {
      apply,
      'report-a-change': {
        nextAllowedStep: '/one',
        state: states.IN_PROGRESS
      }
    }
  }

  getSessionDetails(journey)(req, res, next)
  t.deepEqual(req.session, expectedSession, 'initialises journey in session')
  t.equal(next.called, true, 'calls next()')
  t.end()
})

test('getSessionDetails() does not reinitialise a journey that already exists in session', (t) => {
  const journey = apply

  const req = {
    session: {
      journeys: {
        apply: {
          nextAllowedStep: '/second',
          state: 'IN_REVIEW'
        }
      }
    }
  }
  const res = { locals: {} }
  const next = sinon.stub()

  const expectedSession = {
    journeys: {
      apply: {
        nextAllowedStep: '/second',
        state: 'IN_REVIEW'
      }
    }
  }

  getSessionDetails(journey)(req, res, next)
  t.deepEqual(req.session, expectedSession, 'does not reinitialise a journey')
  t.equal(next.called, true, 'calls next()')
  t.end()
})

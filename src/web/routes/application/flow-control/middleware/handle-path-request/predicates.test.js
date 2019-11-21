const test = require('tape')
const sinon = require('sinon')
const { stepNotNavigable, completedJourneyExistsInSession } = require('./predicates')
const testUtils = require('../../test-utils')
const { IN_PROGRESS, IN_REVIEW, COMPLETED } = require('../../states')

const { buildSessionForJourney } = testUtils

test('stepNotNavigable() returns false if isNavigable prop does not exist', (t) => {
  const step = {
    path: '/step'
  }

  const result = stepNotNavigable(step)
  t.equal(result, false, 'returns false if isNavigable prop does not exist')
  t.end()
})

test('stepNotNavigable() returns false if isNavigable prop is not a function', (t) => {
  const isNavigablePropValues = ['string', 22, true, false]

  isNavigablePropValues.forEach(value => {
    const step = {
      path: '/step',
      isNavigable: value
    }

    const result = stepNotNavigable(step)
    t.equal(result, false, `returns false if isNavigable prop is set to ${value}`)
  })

  t.end()
})

test('stepNotNavigable() returns true if isNavigable prop returns false', (t) => {
  const session = {}
  const req = { session }
  const isNavigable = sinon.stub().returns(false)

  const step = {
    path: '/step',
    isNavigable
  }

  const result = stepNotNavigable(step, req)
  t.equal(isNavigable.calledWith(session), true, 'calls isNavigable function with session')
  t.equal(result, true, 'returns true if isNavigable prop returns false')
  t.end()
})

test('stepNotNavigable() returns false if isNavigable prop returns true', (t) => {
  const session = {}
  const req = { session }
  const isNavigable = sinon.stub().returns(true)

  const step = {
    path: '/step',
    isNavigable
  }

  const result = stepNotNavigable(step, req)
  t.equal(isNavigable.calledWith(session), true, 'calls isNavigable function with session')
  t.equal(result, false, 'returns false if isNavigable prop returns true')
  t.end()
})

test('completedJourneyExistsInSession() returns true if completed journey exists in session', (t) => {
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: 'apply', state: IN_PROGRESS }),
      ...buildSessionForJourney({ journeyName: 'report-a-change', state: COMPLETED })
    }
  }

  const result = completedJourneyExistsInSession(req)
  t.equal(result, true, 'returns true if completed journey exists in session')
  t.end()
})

test('completedJourneyExistsInSession() returns false if completed journey does not exist in session', (t) => {
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: 'apply', state: IN_PROGRESS }),
      ...buildSessionForJourney({ journeyName: 'report-a-change', state: IN_REVIEW })
    }
  }

  const result = completedJourneyExistsInSession(req)
  t.equal(result, false, 'returns false if completed journey does not exist in session')
  t.end()
})

test('completedJourneyExistsInSession() returns false if no journeys exist in session', (t) => {
  const req = {
    session: {}
  }

  const result = completedJourneyExistsInSession(req)
  t.equal(result, false, 'returns false if no journeys exist in session')
  t.end()
})

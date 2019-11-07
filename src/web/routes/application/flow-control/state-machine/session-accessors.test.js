const test = require('tape')
const { JOURNEYS_KEY, NEXT_ALLOWED_PATH_KEY, STATE_KEY } = require('./keys')
const { setNextAllowedPathInSession, setStateInSession, getNextAllowedPathFromSession, getStateFromSession } = require('./session-accessors')

const JOURNEY = { name: 'report-a-change' }

test('setNextAllowedPathInSession() sets the next allowed path for the correct journey in session', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        apply: {
          [NEXT_ALLOWED_PATH_KEY]: '/third'
        },
        'report-a-change': {
          [NEXT_ALLOWED_PATH_KEY]: '/first'
        }
      }
    }
  }

  const expectedJourneysState = {
    apply: {
      [NEXT_ALLOWED_PATH_KEY]: '/third'
    },
    'report-a-change': {
      [NEXT_ALLOWED_PATH_KEY]: '/second'
    }
  }

  setNextAllowedPathInSession(req, JOURNEY, '/second')
  t.deepEqual(req.session[JOURNEYS_KEY], expectedJourneysState, 'sets the next allowed path for the correct journey in session')
  t.end()
})

test('setStateInSession() sets the state for the correct journey in session', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        apply: {
          [STATE_KEY]: 'IN_PROGRESS'
        },
        'report-a-change': {
          [STATE_KEY]: 'IN_PROGRESS'
        }
      }
    }
  }

  const expectedJourneysState = {
    apply: {
      [STATE_KEY]: 'IN_PROGRESS'
    },
    'report-a-change': {
      [STATE_KEY]: 'IN_REVIEW'
    }
  }

  setStateInSession(req, JOURNEY, 'IN_REVIEW')
  t.deepEqual(req.session[JOURNEYS_KEY], expectedJourneysState, 'sets the state for the correct journey in session')
  t.end()
})

test('getNextAllowedPathFromSession() gets next allowed path for the correct journey', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        apply: {
          [NEXT_ALLOWED_PATH_KEY]: '/third'
        },
        'report-a-change': {
          [NEXT_ALLOWED_PATH_KEY]: '/first'
        }
      }
    }
  }

  const result = getNextAllowedPathFromSession(req, JOURNEY)
  t.equal(result, '/first', 'gets next allowed path for the correct journey')
  t.end()
})

test('getStateFromSession() gets state for the correct journey', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        apply: {
          [STATE_KEY]: 'IN_PROGRESS'
        },
        'report-a-change': {
          [STATE_KEY]: 'IN_REVIEW'
        }
      }
    }
  }

  const result = getStateFromSession(req, JOURNEY)
  t.equal(result, 'IN_REVIEW', 'gets state for the correct journey')
  t.end()
})

const test = require('tape')
const { buildSessionForJourney, getStateForJourney, getNextAllowedPathForJourney } = require('./test-utils')
const { JOURNEYS_KEY, STATE_KEY, NEXT_ALLOWED_PATH_KEY } = require('../keys')

test('buildSessionForJourney() should build the correct journey status for supplied values', (t) => {
  const result = buildSessionForJourney({
    journeyName: 'apply',
    state: 'IN_PROGRESS',
    nextAllowedPath: '/name'
  })

  const expected = {
    [JOURNEYS_KEY]: {
      apply: {
        [STATE_KEY]: 'IN_PROGRESS',
        [NEXT_ALLOWED_PATH_KEY]: '/name'
      }
    }
  }

  t.deepEqual(result, expected, 'builds the correct journey status for supplied values')
  t.end()
})

test('getStateForJourney() gets the state for the correct journey', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        apply: {
          [STATE_KEY]: 'IN_PROGRESS',
          [NEXT_ALLOWED_PATH_KEY]: '/name'
        },
        reportChange: {
          [STATE_KEY]: 'IN_REVIEW',
          [NEXT_ALLOWED_PATH_KEY]: '/email-address'
        }
      }
    }
  }

  const result = getStateForJourney('apply')(req)
  t.equal(result, 'IN_PROGRESS', 'gets the state for the correct journey')
  t.end()
})

test('getNextAllowedPathForJourney() gets the next allowed path for the correct journey', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        apply: {
          [STATE_KEY]: 'IN_PROGRESS',
          [NEXT_ALLOWED_PATH_KEY]: '/name'
        },
        reportChange: {
          [STATE_KEY]: 'IN_REVIEW',
          [NEXT_ALLOWED_PATH_KEY]: '/email-address'
        }
      }
    }
  }

  const result = getNextAllowedPathForJourney('apply')(req)
  t.equal(result, '/name', 'gets the next allowed path for the correct journey')
  t.end()
})

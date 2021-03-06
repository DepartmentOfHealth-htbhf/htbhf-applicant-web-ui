const test = require('tape')
const { JOURNEYS_KEY, NEXT_ALLOWED_PATH_KEY, STATE_KEY } = require('../keys')
const {
  setJourneySessionProp,
  getJourneySessionProp,
  setNextAllowedPathInSession,
  setStateInSession,
  getNextAllowedPathFromSession,
  getStateFromSession,
  getJourneysFromSession,
  getAdditionalDataForStep,
  setAdditionalDataForStep
} = require('./session-accessors')

const REPORT_A_CHANGE_JOURNEY = { name: 'report-a-change' }

test('setJourneySessionProp() throws an error if journey is undefined', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        'report-a-change': {
          nextPath: '/first'
        }
      }
    }
  }

  const result = () => setJourneySessionProp('nextPath')(req, undefined, '/second')

  t.throws(result, /No journey defined when trying to set "nextPath" as "\/second"/, 'throws an error if journey name is undefined')
  t.end()
})

test('setJourneySessionProp() throws an error if journey name is undefined', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        'report-a-change': {
          nextPath: '/first'
        }
      }
    }
  }

  const result = () => setJourneySessionProp('nextPath')(req, {}, '/second')

  t.throws(result, /No name defined for journey when trying to set "nextPath" as "\/second"/, 'throws an error if journey name is undefined')
  t.end()
})

test('getJourneySessionProp() throws an error if journey is undefined', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        'report-a-change': {
          nextPath: '/first'
        }
      }
    }
  }

  const result = () => getJourneySessionProp('nextPath')(req, undefined)

  t.throws(result, /No journey defined when trying to get "nextPath"/, 'throws an error if journey name is undefined')
  t.end()
})

test('getJourneySessionProp() throws an error if journey name is undefined', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        'report-a-change': {
          nextPath: '/first'
        }
      }
    }
  }

  const result = () => getJourneySessionProp('nextPath')(req, {})

  t.throws(result, /Property "nextPath" does not exist in session for journey name "undefined"/, 'throws an error if journey name is undefined')
  t.end()
})

test('getJourneySessionProp() throws an error if prop is undefined in session', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        'report-a-change': {
          nextPath: '/first'
        }
      }
    }
  }

  const result = () => getJourneySessionProp('state')(req, REPORT_A_CHANGE_JOURNEY)

  t.throws(result, /Property "state" does not exist in session for journey name "report-a-change"/, 'throws an error if prop is undefined in session')
  t.end()
})

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

  setNextAllowedPathInSession(req, REPORT_A_CHANGE_JOURNEY, '/second')
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

  setStateInSession(req, REPORT_A_CHANGE_JOURNEY, 'IN_REVIEW')
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

  const result = getNextAllowedPathFromSession(req, REPORT_A_CHANGE_JOURNEY)
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

  const result = getStateFromSession(req, REPORT_A_CHANGE_JOURNEY)
  t.equal(result, 'IN_REVIEW', 'gets state for the correct journey')
  t.end()
})

test('getJourneysFromSession() returns list of associated journey name and properties from session', (t) => {
  const req = {
    session: {
      [JOURNEYS_KEY]: {
        apply: {
          [STATE_KEY]: 'IN_PROGRESS',
          [NEXT_ALLOWED_PATH_KEY]: '/first'
        },
        'report-a-change': {
          [STATE_KEY]: 'IN_REVIEW',
          [NEXT_ALLOWED_PATH_KEY]: '/last'
        }
      }
    }
  }

  const result = getJourneysFromSession(req)

  const expected = [
    ['apply', { [STATE_KEY]: 'IN_PROGRESS', [NEXT_ALLOWED_PATH_KEY]: '/first' }],
    ['report-a-change', { [STATE_KEY]: 'IN_REVIEW', [NEXT_ALLOWED_PATH_KEY]: '/last' }]
  ]

  t.deepEqual(result, expected, 'returns journey name and properties from session')
  t.end()
})

test('setAdditionalDataForStep() inserts additionalData into session for step', (t) => {
  const req = {
    session: {
      stepData: {}
    }
  }
  const step = { path: '/step-path' }
  const stepData = { firstName: 'Joe', lastName: 'Bloggs' }

  setAdditionalDataForStep(req, step, stepData)

  t.deepEqual(req.session.stepData[step.path], stepData, 'sets stepData on session.stepData')
  t.end()
})

test('getAdditionalDataForStep() inserts stepData into session for step', (t) => {
  const stepData = { firstName: 'Joe', lastName: 'Bloggs' }
  const req = {
    session: {
      stepData: { '/step-path': stepData }
    }
  }
  const step = { path: '/step-path' }

  const result = getAdditionalDataForStep(req, step)

  t.deepEqual(result, stepData, 'gets stepData from session.stepData')
  t.end()
})

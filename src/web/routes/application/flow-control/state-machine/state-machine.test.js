const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const { partial } = require('ramda')
const { IN_PROGRESS, IN_REVIEW, COMPLETED } = require('./states')
const { GET_NEXT_PATH, INVALIDATE_REVIEW, SET_NEXT_ALLOWED_PATH, INCREMENT_NEXT_ALLOWED_PATH } = require('./actions')
const { CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('../../paths')
const { buildSessionForJourney, getStateForJourney, getNextAllowedPathForJourney } = require('../test-utils')

const info = sinon.spy()
const logger = { info }

const { stateMachine } = proxyquire('./state-machine', {
  '../../../../logger': { logger }
})

const APPLY = 'apply'

const APPLY_JOURNEY = {
  name: APPLY,
  steps: [
    { path: '/first', next: () => '/second' },
    { path: '/second', next: () => '/third' },
    { path: '/third', isNavigable: () => false, next: () => '/fourth' }
  ],
  pathsInSequence: ['/first', '/second', '/third']
}

const getStateForApplyJourney = partial(getStateForJourney, [APPLY])

const getNextAllowedPathForApplyJourney = partial(getNextAllowedPathForJourney, [APPLY])

test(`Dispatching ${GET_NEXT_PATH} should return next property of associated step when state of ${IN_PROGRESS} defined in session`, (t) => {
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_PROGRESS })
    },
    path: '/first'
  }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, APPLY_JOURNEY), '/second')
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return next navigable path when state of ${IN_PROGRESS} defined in session and next step is not navigable`, (t) => {
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_PROGRESS })
    },
    path: '/second'
  }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, APPLY_JOURNEY), '/fourth')
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return ${CHECK_ANSWERS_URL} path when state of ${IN_REVIEW} defined in session`, (t) => {
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_REVIEW })
    },
    path: '/first'
  }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, APPLY_JOURNEY), CHECK_ANSWERS_URL)
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return ${TERMS_AND_CONDITIONS_URL} when state of ${IN_REVIEW} and current path is ${CHECK_ANSWERS_URL}`, (t) => {
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_REVIEW })
    },
    path: CHECK_ANSWERS_URL
  }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, APPLY_JOURNEY), TERMS_AND_CONDITIONS_URL)
  t.end()
})

test(`Dispatching ${GET_NEXT_PATH} should return ${CONFIRM_URL} path when state of ${COMPLETED} defined in session`, (t) => {
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: COMPLETED })
    },
    path: '/first'
  }

  t.equal(stateMachine.dispatch(GET_NEXT_PATH, req, APPLY_JOURNEY), CONFIRM_URL)
  t.end()
})

test(`Dispatching an invalid action should return null`, (t) => {
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_PROGRESS })
    },
    path: '/first'
  }

  t.equal(stateMachine.dispatch('INVALID_ACTION', req, APPLY_JOURNEY), null)
  t.end()
})

test(`Dispatching ${INVALIDATE_REVIEW} should set state to ${IN_PROGRESS} when state is ${IN_REVIEW}`, (t) => {
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_REVIEW })
    },
    path: '/first'
  }

  stateMachine.dispatch(INVALIDATE_REVIEW, req, APPLY_JOURNEY)
  t.equal(getStateForApplyJourney(req), IN_PROGRESS, `sets state to ${IN_PROGRESS}`)
  t.end()
})

test(`Dispatching ${INVALIDATE_REVIEW} should not update state when session.state is not ${IN_REVIEW}`, (t) => {
  [IN_PROGRESS, COMPLETED].forEach(state => {
    const req = {
      session: {
        ...buildSessionForJourney({ journeyName: APPLY, state })
      },
      path: '/first'
    }

    stateMachine.dispatch(INVALIDATE_REVIEW, req, APPLY_JOURNEY)
    t.equal(getStateForApplyJourney(req), state, `does not update state for ${state}`)
  })

  t.end()
})

test('setState does not log a change in state if the new state is the same as the current state', (t) => {
  info.resetHistory()
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_PROGRESS })
    }
  }

  stateMachine.setState(IN_PROGRESS, req, APPLY_JOURNEY)

  t.equal(info.called, false, 'Should not log a change in state')
  t.end()
})

test('setState sets the state if the new state is different from the current state', (t) => {
  info.resetHistory()
  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_PROGRESS })
    }
  }

  stateMachine.setState(COMPLETED, req, APPLY_JOURNEY)
  t.equal(getStateForApplyJourney(req), COMPLETED, 'Should set state')
  t.equal(info.called, true, 'Should log a change in state')
  t.end()
})

test(`Dispatching ${SET_NEXT_ALLOWED_PATH} sets next allowed path in session`, (t) => {
  const appStates = [
    { state: IN_PROGRESS, path: '/name' },
    { state: IN_REVIEW, path: '/check' },
    { state: COMPLETED, path: '/success' }
  ]

  appStates.forEach(appState => {
    const { state, path } = appState
    const req = {
      session: {
        ...buildSessionForJourney({ journeyName: APPLY, state })
      }
    }

    stateMachine.dispatch(SET_NEXT_ALLOWED_PATH, req, APPLY_JOURNEY, path)
    t.equal(getNextAllowedPathForApplyJourney(req), path, `sets next allowed path in session for ${state}`)
  })

  t.end()
})

test(`Dispatching ${INCREMENT_NEXT_ALLOWED_PATH} updates next allowed path in session with the next allowed path in sequence`, (t) => {
  const appStates = [
    { state: IN_PROGRESS, path: '/first', expectedNextPath: '/second' },
    { state: IN_REVIEW, path: CHECK_ANSWERS_URL, expectedNextPath: TERMS_AND_CONDITIONS_URL },
    { state: COMPLETED, path: CONFIRM_URL, expectedNextPath: CONFIRM_URL }
  ]

  appStates.forEach(appState => {
    const { state, path, expectedNextPath } = appState
    const req = {
      path,
      session: {
        ...buildSessionForJourney({ journeyName: APPLY, state })
      }
    }

    stateMachine.dispatch(INCREMENT_NEXT_ALLOWED_PATH, req, APPLY_JOURNEY)
    t.equal(getNextAllowedPathForApplyJourney(req), expectedNextPath, `increments next allowed path in session for ${state}`)
  })

  t.end()
})

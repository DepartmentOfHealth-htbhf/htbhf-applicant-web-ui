const { equals, isNil } = require('ramda')
const { getNextForStep } = require('./get-next-for-step')
const { CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('../constants')
const { logger } = require('../../../../logger')

const states = {
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  COMPLETED: 'COMPLETED'
}
const actions = {
  GET_NEXT_PATH: 'getNextPath',
  IS_PATH_ALLOWED: 'isPathAllowed',
  GET_NEXT_ALLOWED_PATH: 'getNextAllowedPath',
  INVALIDATE_REVIEW: 'invalidateReview'
}

const getStepForPath = (path, steps) => steps.find(step => step.path === path)

/**
 * Next path is navigable if the next step does not exist, if it doesn't define an isNavigable function, or that function returns true.
 * E.g. if the current step is the end of the 'in-progress' journey, the next path will be /check-answers. There is no step matching /check-answers, so we assume it is navigable.
 */
const isNextPathNavigable = (nextStep, req) => isNil(nextStep) || isNil(nextStep.isNavigable) || nextStep.isNavigable(req.session)

/**
 * Ask the current step for the next path. Test whether the step matching that path is navigable. If not, ask that step for the next path; repeat.
 * @param path the path of the current step
 * @param req the current request
 * @param steps the steps of the apply journey
 * @returns the path of the next step
 */
const getNextNavigablePath = (path, req, steps) => {
  const thisStep = getStepForPath(path, steps)
  const nextPath = getNextForStep(req, thisStep, steps)
  const nextStep = getStepForPath(nextPath, steps)
  if (isNextPathNavigable(nextStep, req)) {
    return nextPath
  }
  return getNextNavigablePath(nextPath, req, steps)
}

const isPathAllowed = (sequence, allowed, path) =>
  sequence.findIndex(equals(path)) <= sequence.findIndex(equals(allowed))

const stateMachine = {
  [states.IN_PROGRESS]: {
    getNextPath: (req, steps) => getNextNavigablePath(req.path, req, steps),
    isPathAllowed: (req, sequence) => isPathAllowed(sequence, req.session.nextAllowedStep, req.path),
    getNextAllowedPath: (req) => req.session.nextAllowedStep
  },
  [states.IN_REVIEW]: {
    getNextPath: (req) => req.path === CHECK_ANSWERS_URL ? TERMS_AND_CONDITIONS_URL : CHECK_ANSWERS_URL,
    isPathAllowed: (req, sequence) => isPathAllowed(sequence, req.session.nextAllowedStep, req.path),
    getNextAllowedPath: (req) => req.session.nextAllowedStep,
    invalidateReview: (req) => stateMachine.setState(states.IN_PROGRESS, req)
  },
  [states.COMPLETED]: {
    getNextPath: () => CONFIRM_URL,
    isPathAllowed: (req) => req.path === CONFIRM_URL,
    getNextAllowedPath: () => CONFIRM_URL
  },

  getState: (req) => {
    return states.hasOwnProperty(req.session.state) ? states[req.session.state] : states.IN_PROGRESS
  },

  setState: (state, req) => {
    if (stateMachine.getState(req) !== state) {
      logger.info(`State set to ${state}`, { req })
      req.session.state = state
    }
  },

  dispatch: (actionType, req, ...args) => {
    const state = stateMachine.getState(req)
    const action = stateMachine[state][actionType]

    if (typeof action !== 'undefined') {
      return action(req, ...args)
    }

    return null
  }
}

module.exports = {
  states,
  stateMachine,
  actions,
  isPathAllowed
}

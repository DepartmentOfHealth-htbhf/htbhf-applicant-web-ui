const { equals, isNil } = require('ramda')
const { getNextForStep } = require('./get-next-for-step')
const { CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('../../paths')
const { logger } = require('../../../../logger')
const states = require('./states')

const { IN_PROGRESS, IN_REVIEW, COMPLETED } = states

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

const setNextAllowedPath = (req, path) => {
  req.session.nextAllowedStep = path
}

const getNextInReviewPath = (req) => req.path === CHECK_ANSWERS_URL ? TERMS_AND_CONDITIONS_URL : CHECK_ANSWERS_URL

const stateMachine = {
  [IN_PROGRESS]: {
    getNextPath: (req, steps) => getNextNavigablePath(req.path, req, steps),
    isPathAllowed: (req, sequence) => isPathAllowed(sequence, req.session.nextAllowedStep, req.path),
    getNextAllowedPath: (req) => req.session.nextAllowedStep,
    setNextAllowedPath,
    incrementNextAllowedPath: (req, steps) => setNextAllowedPath(req, getNextNavigablePath(req.path, req, steps))
  },
  [IN_REVIEW]: {
    getNextPath: getNextInReviewPath,
    isPathAllowed: (req, sequence) => isPathAllowed(sequence, req.session.nextAllowedStep, req.path),
    getNextAllowedPath: (req) => req.session.nextAllowedStep,
    setNextAllowedPath,
    incrementNextAllowedPath: (req) => setNextAllowedPath(req, getNextInReviewPath(req)),
    invalidateReview: (req) => stateMachine.setState(IN_PROGRESS, req)
  },
  [COMPLETED]: {
    getNextPath: () => CONFIRM_URL,
    isPathAllowed: (req) => req.path === CONFIRM_URL,
    getNextAllowedPath: () => CONFIRM_URL,
    setNextAllowedPath,
    incrementNextAllowedPath: (req) => setNextAllowedPath(req, CONFIRM_URL)
  },

  getState: (req) => {
    return req.session.hasOwnProperty('state') ? states[req.session.state] : IN_PROGRESS
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
  stateMachine,
  isPathAllowed
}

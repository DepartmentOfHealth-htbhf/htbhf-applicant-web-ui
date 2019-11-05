const { CONFIRM_URL } = require('../../paths')
const { logger } = require('../../../../logger')
const states = require('./states')
const { isPathAllowed } = require('./predicates')
const { getNextNavigablePath, getNextInReviewPath } = require('./selectors')
const { setNextAllowedPath } = require('./operators')

const { IN_PROGRESS, IN_REVIEW, COMPLETED } = states

const stateMachine = {
  [IN_PROGRESS]: {
    getNextPath: (req, journey) => getNextNavigablePath(req.path, req, journey.steps),
    isPathAllowed: (req, journey) => isPathAllowed(journey.pathsInSequence, req.session.nextAllowedStep, req.path),
    getNextAllowedPath: (req) => req.session.nextAllowedStep,
    setNextAllowedPath,
    incrementNextAllowedPath: (req, journey) => setNextAllowedPath(req, journey, getNextNavigablePath(req.path, req, journey.steps))
  },
  [IN_REVIEW]: {
    getNextPath: getNextInReviewPath,
    isPathAllowed: (req, journey) => isPathAllowed(journey.pathsInSequence, req.session.nextAllowedStep, req.path),
    getNextAllowedPath: (req) => req.session.nextAllowedStep,
    setNextAllowedPath,
    incrementNextAllowedPath: (req, journey) => setNextAllowedPath(req, journey, getNextInReviewPath(req)),
    invalidateReview: (req) => stateMachine.setState(IN_PROGRESS, req)
  },
  [COMPLETED]: {
    getNextPath: () => CONFIRM_URL,
    isPathAllowed: (req) => req.path === CONFIRM_URL,
    getNextAllowedPath: () => CONFIRM_URL,
    setNextAllowedPath,
    incrementNextAllowedPath: (req, journey) => setNextAllowedPath(req, journey, CONFIRM_URL)
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

  dispatch: (actionType, req, journey, ...args) => {
    const state = stateMachine.getState(req)
    const action = stateMachine[state][actionType]

    if (typeof action !== 'undefined') {
      return action(req, journey, ...args)
    }

    return null
  }
}

module.exports = {
  stateMachine
}

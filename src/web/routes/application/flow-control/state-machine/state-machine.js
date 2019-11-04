const { CONFIRM_URL } = require('../../paths')
const { logger } = require('../../../../logger')
const states = require('./states')
const { isPathAllowed } = require('./predicates')
const { getNextNavigablePath, getNextInReviewPath } = require('./selectors')

const { IN_PROGRESS, IN_REVIEW, COMPLETED } = states

const setNextAllowedPath = (req, path) => {
  req.session.nextAllowedStep = path
}

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
  stateMachine
}

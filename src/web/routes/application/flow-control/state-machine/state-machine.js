const { DECISION_URL, prefixPath } = require('../../paths')
const { logger } = require('../../../../logger')
const states = require('../states')
const { isPathAllowed } = require('./predicates')
const { getNextNavigablePath, getNextInReviewPath } = require('./selectors')
const {
  setNextAllowedPathInSession,
  setStateInSession,
  getNextAllowedPathFromSession,
  getStateFromSession
} = require('../session-accessors')

const { IN_PROGRESS, IN_REVIEW, COMPLETED } = states

const stateMachine = {
  [IN_PROGRESS]: {
    getNextPath: (req, journey) => getNextNavigablePath(req.path, req, journey),
    isPathAllowed: (req, journey) => isPathAllowed(journey.pathsInSequence, getNextAllowedPathFromSession(req, journey), req.path),
    getNextAllowedPath: getNextAllowedPathFromSession,
    setNextAllowedPath: setNextAllowedPathInSession,
    incrementNextAllowedPath: (req, journey) => setNextAllowedPathInSession(req, journey, getNextNavigablePath(req.path, req, journey))
  },
  [IN_REVIEW]: {
    getNextPath: (req, journey) => getNextInReviewPath(req, journey.pathPrefix),
    isPathAllowed: (req, journey) => isPathAllowed(journey.pathsInSequence, getNextAllowedPathFromSession(req, journey), req.path),
    getNextAllowedPath: getNextAllowedPathFromSession,
    setNextAllowedPath: setNextAllowedPathInSession,
    incrementNextAllowedPath: (req, journey) => setNextAllowedPathInSession(req, journey, getNextInReviewPath(req, journey.pathPrefix)),
    invalidateReview: (req, journey) => setStateInSession(req, journey, IN_PROGRESS)
  },
  [COMPLETED]: {
    getNextPath: (req, journey) => prefixPath(journey.pathPrefix, DECISION_URL),
    isPathAllowed: (req, journey) => req.path === prefixPath(journey.pathPrefix, DECISION_URL),
    getNextAllowedPath: (req, journey) => prefixPath(journey.pathPrefix, DECISION_URL),
    setNextAllowedPath: setNextAllowedPathInSession,
    incrementNextAllowedPath: (req, journey) => setNextAllowedPathInSession(req, journey, prefixPath(journey.pathPrefix, DECISION_URL))
  },

  getState: getStateFromSession,

  setState: (state, req, journey) => {
    if (getStateFromSession(req, journey) !== state) {
      logger.info(`State set to ${state}`, { req })
      setStateInSession(req, journey, state)
    }
  },

  dispatch: (actionType, req, journey, ...args) => {
    const state = getStateFromSession(req, journey)
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

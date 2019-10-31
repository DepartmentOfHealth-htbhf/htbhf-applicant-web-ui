const { CONFIRM_URL } = require('../../../paths')
const { stateMachine, actions, states } = require('../../state-machine')
const { isPathInApplicationFlow, stepNotNavigable } = require('./predicates')
const { getPathsInSequence } = require('./selectors')

const { COMPLETED } = states
const { IS_PATH_ALLOWED, GET_NEXT_ALLOWED_PATH, SET_NEXT_ALLOWED_PATH } = actions

const middleware = (config, pathsInSequence, step) => (req, res, next) => {
  // Destroy the session on navigating away from CONFIRM_URL
  if (stateMachine.getState(req) === COMPLETED && req.path !== CONFIRM_URL) {
    req.session.destroy()
    res.clearCookie('lang')

    if (isPathInApplicationFlow(req.path, pathsInSequence)) {
      return res.redirect(config.environment.OVERVIEW_URL)
    }

    return next()
  }

  // Initialise nextAllowedPath if none exists in session
  let nextAllowedPath = stateMachine.dispatch(GET_NEXT_ALLOWED_PATH, req)

  if (!nextAllowedPath) {
    const firstPathInSequence = pathsInSequence[0]
    stateMachine.dispatch(SET_NEXT_ALLOWED_PATH, req, firstPathInSequence)
    nextAllowedPath = firstPathInSequence
  }

  const isPathAllowed = stateMachine.dispatch(IS_PATH_ALLOWED, req, pathsInSequence)

  // Redirect to nextAllowedPath on invalid path request
  if (!isPathAllowed) {
    return res.redirect(nextAllowedPath)
  }

  // If step is not navigable then return to the next allowed path
  if (stepNotNavigable(step, req)) {
    return res.redirect(nextAllowedPath)
  }

  next()
}

const handleRequestForPath = (config, journey, step) => middleware(config, getPathsInSequence(journey.steps), step)

module.exports = {
  handleRequestForPath
}

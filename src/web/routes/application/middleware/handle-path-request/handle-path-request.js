const { CONFIRM_URL } = require('../../common/constants')
const { stateMachine, actions, states } = require('../../common/state-machine')
const { isPathInSequence, stepNotNavigable } = require('./predicates')
const { getPathsInSequence } = require('./selectors')

const { IS_PATH_ALLOWED, GET_NEXT_ALLOWED_PATH } = actions

const middleware = (config, pathsInSequence, step) => (req, res, next) => {
  // Destroy the session on navigating away from CONFIRM_URL
  if (stateMachine.getState(req) === states.COMPLETED && req.path !== CONFIRM_URL) {
    req.session.destroy()
    res.clearCookie('lang')

    if (isPathInSequence(req.path, pathsInSequence)) {
      return res.redirect(config.environment.OVERVIEW_URL)
    }

    return next()
  }

  // Initialise nextAllowedStep if none exists in session
  if (!req.session.nextAllowedStep) {
    req.session.nextAllowedStep = pathsInSequence[0]
  }

  const isPathAllowed = stateMachine.dispatch(IS_PATH_ALLOWED, req, pathsInSequence)
  const nextAllowedPath = stateMachine.dispatch(GET_NEXT_ALLOWED_PATH, req)

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

const handleRequestForPath = (config, steps, step) => middleware(config, getPathsInSequence(steps), step)

module.exports = {
  isPathInSequence,
  getPathsInSequence,
  handleRequestForPath
}

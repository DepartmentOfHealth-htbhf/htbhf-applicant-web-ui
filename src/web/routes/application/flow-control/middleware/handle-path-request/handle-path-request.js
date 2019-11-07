const { CONFIRM_URL } = require('../../../paths')
const { stateMachine, actions, states } = require('../../state-machine')
const { stepNotNavigable } = require('./predicates')

const { COMPLETED } = states
const { IS_PATH_ALLOWED, GET_NEXT_ALLOWED_PATH, SET_NEXT_ALLOWED_PATH } = actions

const handleRequestForPath = (config, journey, step) => (req, res, next) => {
  const { pathsInSequence } = journey
  const firstPathInSequence = pathsInSequence[0]

  // Destroy the session on navigating away from CONFIRM_URL
  if (stateMachine.getState(req) === COMPLETED && req.path !== CONFIRM_URL) {
    req.session.destroy()
    res.clearCookie('lang')
    return res.redirect(firstPathInSequence)
  }

  // Initialise nextAllowedPath if none exists in session
  let nextAllowedPath = stateMachine.dispatch(GET_NEXT_ALLOWED_PATH, req, journey)

  if (!nextAllowedPath) {
    stateMachine.dispatch(SET_NEXT_ALLOWED_PATH, req, journey, firstPathInSequence)
    nextAllowedPath = firstPathInSequence
  }

  const isPathAllowed = stateMachine.dispatch(IS_PATH_ALLOWED, req, journey)

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

module.exports = {
  handleRequestForPath
}

const { CONFIRM_URL } = require('../../../paths')
const { stateMachine, actions, states } = require('../../state-machine')
const { stepNotNavigable } = require('./predicates')

const { COMPLETED } = states
const { IS_PATH_ALLOWED, GET_NEXT_ALLOWED_PATH } = actions

// TODO HTBHF-2506 remove config from signature as no longer required
const handleRequestForPath = (config, journey, step) => (req, res, next) => {
  const { pathsInSequence } = journey
  const firstPathInSequence = pathsInSequence[0]

  // Destroy the session on navigating away from CONFIRM_URL
  if (stateMachine.getState(req, journey) === COMPLETED && req.path !== CONFIRM_URL) {
    req.session.destroy()
    res.clearCookie('lang')
    return res.redirect(firstPathInSequence)
  }

  const nextAllowedPath = stateMachine.dispatch(GET_NEXT_ALLOWED_PATH, req, journey)
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

const { CONFIRM_URL } = require('../../../paths')
const { stateMachine, actions } = require('../../state-machine')
const { stepNotNavigable, completedJourneyExistsInSession } = require('./predicates')

const { IS_PATH_ALLOWED, GET_NEXT_ALLOWED_PATH } = actions

const handleRequestForPath = (journey, step) => (req, res, next) => {
  const { pathsInSequence } = journey
  const firstPathInSequence = pathsInSequence[0]

  // Destroy the session if any COMPLETED journeys exists in session, and path is not a CONFIRM_URL path
  if (completedJourneyExistsInSession(req) && !req.path.endsWith(CONFIRM_URL)) {
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

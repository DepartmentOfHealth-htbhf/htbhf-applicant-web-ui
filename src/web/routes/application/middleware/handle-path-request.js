const { CHECK_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('../common/constants')
const { PAGES } = require('../../guidance/pages')
const { stateMachine, actions, states } = require('../common/state-machine')

const { IS_PATH_ALLOWED, GET_NEXT_ALLOWED_PATH } = actions

const getPathsInSequence = (steps) => [...steps.map(step => step.path), CHECK_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL]

const stepNotNavigable = (step, req) => step && typeof step.isNavigable === 'function' && !step.isNavigable(req.session)

const isGuidancePageUrl = (path) => PAGES.map((page) => page.path).includes(path)

const middleware = (config, pathsInSequence, step) => (req, res, next) => {
  // Destroy the session on navigating away from CONFIRM_URL
  if (stateMachine.getState(req) === states.COMPLETED && req.path !== CONFIRM_URL) {
    req.session.destroy()
    res.clearCookie('lang')
    const redirectPath = isGuidancePageUrl(req.path, PAGES) ? req.path : config.environment.OVERVIEW_URL
    return res.redirect(redirectPath)
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
  getPathsInSequence,
  handleRequestForPath,
  isGuidancePageUrl
}

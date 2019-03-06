const { CHECK_URL, CONFIRM_URL } = require('../common/constants')
const { stateMachine, actions } = require('../common/state-machine')

const { IS_PATH_ALLOWED, GET_NEXT_ALLOWED_PATH } = actions

const getPathsInSequence = (steps) => [...steps.map(step => step.path), CHECK_URL, CONFIRM_URL]

const middleware = (pathsInSequence) => (req, res, next) => {
  if (!req.session.nextAllowedStep) {
    req.session.nextAllowedStep = pathsInSequence[0]
  }

  const isPathAllowed = stateMachine.dispatch(IS_PATH_ALLOWED, req, pathsInSequence, req.session.nextAllowedStep, req.path)
  const nextAllowedPath = stateMachine.dispatch(GET_NEXT_ALLOWED_PATH, req, req.session.nextAllowedStep)

  if (!isPathAllowed) {
    return res.redirect(nextAllowedPath)
  }

  next()
}

const handleRequestForPath = (steps) => middleware(getPathsInSequence(steps))

module.exports = {
  getPathsInSequence,
  handleRequestForPath
}

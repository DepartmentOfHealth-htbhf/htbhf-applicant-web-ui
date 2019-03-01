const { CHECK_URL } = require('../common/constants')

const getPathsInSequence = (steps) => [...steps.map(step => step.path), CHECK_URL]

const middleware = (pathsInSequence) => (req, res, next) => {
  if (!req.session.nextAllowedStep) {
    req.session.nextAllowedStep = pathsInSequence[0]
  }

  next()
}

const handlePathRequest = (steps) => middleware(getPathsInSequence(steps))

module.exports = {
  getPathsInSequence,
  handlePathRequest
}

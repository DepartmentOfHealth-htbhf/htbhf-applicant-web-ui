const { equals } = require('ramda')
const { CHECK_URL } = require('../common/constants')

const getPathsInSequence = (steps) => [...steps.map(step => step.path), CHECK_URL]

const isPathAllowed = (sequence, allowed, path) =>
  sequence.findIndex(equals(path)) <= sequence.findIndex(equals(allowed))

const middleware = (pathsInSequence) => (req, res, next) => {
  if (!req.session.nextAllowedStep) {
    req.session.nextAllowedStep = pathsInSequence[0]
  }

  if (!isPathAllowed(pathsInSequence, req.session.nextAllowedStep, req.path)) {
    return res.redirect(req.session.nextAllowedStep)
  }

  next()
}

const handleRequestForPath = (steps) => middleware(getPathsInSequence(steps))

module.exports = {
  getPathsInSequence,
  isPathAllowed,
  handleRequestForPath
}

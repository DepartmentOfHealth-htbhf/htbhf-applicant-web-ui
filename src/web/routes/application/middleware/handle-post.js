const httpStatus = require('http-status-codes')
const { validationResult } = require('express-validator/check')
const { wrapError } = require('../common/formatters')

const getActiveStep = (steps, path) => steps.find(step => step.path === path)

const getNextPath = (steps, path) => {
  const activeStep = getActiveStep(steps, path)
  const nextPath = activeStep.next

  if (!nextPath) {
    throw new Error(`No next step defined for ${path}`)
  }

  return nextPath
}

const handlePost = (steps) => (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array()
      res.locals.claim = req.body
      return next()
    }

    req.session.claim = {
      ...req.session.claim,
      ...req.body
    }
    req.session.nextAllowedStep = getNextPath(steps, req.path)

    return next()
  } catch (error) {
    next(wrapError({
      cause: error,
      message: `Error posting ${req.path}`,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR
    }))
  }
}

module.exports = {
  handlePost
}

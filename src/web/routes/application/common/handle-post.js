const httpStatus = require('http-status-codes')
const { validationResult } = require('express-validator/check')

const handlePost = (req, res, next) => {
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
    return next()
  } catch (error) {
    const err = new Error('Error posting', req.path, error)
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    next(err)
  }
}

module.exports = {
  handlePost
}

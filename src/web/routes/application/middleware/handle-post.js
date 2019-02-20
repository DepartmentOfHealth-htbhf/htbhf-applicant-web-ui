const { validationResult } = require('express-validator/check')
const { mergeErrorProps } = require('../common/formatters')

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
    next(mergeErrorProps({
      cause: error,
      message: `Error posting ${req.path}`
    }))
  }
}

module.exports = {
  handlePost
}

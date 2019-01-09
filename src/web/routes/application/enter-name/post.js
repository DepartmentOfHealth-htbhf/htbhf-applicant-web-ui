const httpStatus = require('http-status-codes')
const { validationResult } = require('express-validator/check')
const { getEnterName } = require('./get')

const postEnterName = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.locals.errors = errors.array()
    res.locals.claim = req.body
    return getEnterName(req, res)
  }

  try {
    req.session.claim = req.body
    res.redirect('confirm')
  } catch (error) {
    const err = new Error('Error posting name:', error)
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    next(err)
  }
}

module.exports = {
  postEnterName
}

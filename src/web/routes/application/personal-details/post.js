const httpStatus = require('http-status-codes')
const { validationResult } = require('express-validator/check');
const { getPersonalDetails } = require('./get')

const postPersonalDetails = (req, res, next) => {
  const errors = validationResult(req)

  console.log(errors.array())

  if (!errors.isEmpty()) {
    res.locals.errors = errors.array()
    return getPersonalDetails(req, res)
  }

  try {
    req.session.body = req.body
    res.redirect('confirm')
  } catch (error) {
    const err = new Error('Error posting personal details:', error)
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    next(err)
  }
}

module.exports = {
  postPersonalDetails
}

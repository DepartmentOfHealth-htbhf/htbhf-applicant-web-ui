const httpStatus = require('http-status-codes')
const { getPersonalDetails } = require('./get')

const postPersonalDetails = (req, res, next) => {
  if (res.locals.errors) {
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

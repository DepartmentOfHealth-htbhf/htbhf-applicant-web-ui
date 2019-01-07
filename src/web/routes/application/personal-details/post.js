const httpStatus = require('http-status-codes')

const postPersonalDetails = async (req, res, next) => {
  try {
    req.session.body = req.body
    res.redirect('confirm')
  } catch (error) {
    const err = new Error('Error saving the session:', error)
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    next(err)
  }
}

module.exports = {
  postPersonalDetails
}

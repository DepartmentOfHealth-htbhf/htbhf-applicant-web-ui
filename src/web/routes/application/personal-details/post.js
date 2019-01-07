const httpStatus = require('http-status-codes')

const postPersonalDetails = (req, res, next) => {
  try {
    req.testing.body = req.body

    res.render('personal-details', { title: 'Personal details' })
  } catch (error) {
    const err = new Error('Error with session:', error)
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    next(err)
  }
}

module.exports = {
  postPersonalDetails
}

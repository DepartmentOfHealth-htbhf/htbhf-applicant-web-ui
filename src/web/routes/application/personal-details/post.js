const httpStatus = require('http-status-codes')
const request = require('request-promise')

const postPersonalDetails = (config) => (req, res, next) => {
  try {
    req.session.body = req.body
    request.post({
      uri: config.environment.CLAIM_BASE_URL,
      json: true,
      body: {
        claimant: {
          ...req.body
        }
      }
    }).then(
      () => {
        res.redirect('complete')
      },
      err => {
        next(err)
      }
    )
  } catch (error) {
    const err = new Error('Error with session:', error)
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    next(err)
  }
}

module.exports = {
  postPersonalDetails
}

const httpStatus = require('http-status-codes')
const request = require('request-promise')

const CLAIMS_ENDPOINT = `/v1/claims`

const postConfirm = (config) => async (req, res, next) => {
  try {
    req.session.body = req.body
    await request.post({
      uri: `${config.environment.CLAIMANT_SERVICE_URL}${CLAIMS_ENDPOINT}`,
      json: true,
      body: {
        claimant: req.body
      }
    })

    req.session.destroy()
    return res.redirect('complete')
  } catch (error) {
    console.log(error.error)
    const err = new Error('Error posting the request')
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    err.error = error.error
    return next(err)
  }
}

module.exports = {
  postConfirm
}

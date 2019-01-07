const httpStatus = require('http-status-codes')
const request = require('request-promise')

const postConfirm = (config) => async (req, res, next) => {
  try {
    req.session.body = req.body
    await request.post({
      uri: config.environment.CLAIM_BASE_URL,
      json: true,
      body: {
        claimant: {
          ...req.body
        }
      }
    })

    console.log('About to destroy!!!!!!!!')
    req.session.destroy()
    res.redirect('complete')
  } catch (error) {
    const err = new Error('Error posting the request:', error)
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    next(err)
  }
}

module.exports = {
  postConfirm
}

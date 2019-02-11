const httpStatus = require('http-status-codes')
const { validationResult } = require('express-validator/check')
const { createClaimService } = require('../services')

const handlePost = (req, res, next) => {
  try {
    const claimService = createClaimService(req)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array()
      res.locals.claim = req.body
      return next()
    }

    claimService.setKeys(req.body)

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

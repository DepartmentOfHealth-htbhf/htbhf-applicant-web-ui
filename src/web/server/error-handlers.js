const httpStatus = require('http-status-codes')

const logErrors = (err, req, res, next) => {
  console.error(err.stack)
  next(err)
}

const errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
  }

  res.status(err.statusCode)
  res.render('error', { error: err, statusCode: res.statusCode })
}

const registerErrorHandlers = (app) => {
  app.use(logErrors)
  app.use(errorHandler)
}

module.exports = {
  errorHandler,
  registerErrorHandlers
}

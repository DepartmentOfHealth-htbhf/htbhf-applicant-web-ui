const logErrors = (err, req, res, next) => {
  console.error(err.stack)
  next(err)
}

const errorHandler = (err, req, res, next) => {
  res.render('error', { error: err, statusCode: res.statusCode })
}

const registerErrorHandlers = (app) => {
  app.use(logErrors)
  app.use(errorHandler)
}

module.exports = {
  registerErrorHandlers
}

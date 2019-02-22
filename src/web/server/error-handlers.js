const httpStatus = require('http-status-codes')
const { logger } = require('../logger')

const toErrorLogMessage = (error) => `${error.toString()}\n${error.stack}`

const logErrors = (err, req, res, next) => {
  logger.error(toErrorLogMessage(err), { req })
  next(err)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR
  res.status(statusCode)

  res.render('error', {
    title: req.t('errors:problemWithTheServiceTitle'),
    heading: req.t('errors:problemWithTheServiceTitle'),
    content: req.t('errors:problemWithTheServiceContent'),
    cookieLinkName: req.t('cookies.linkName')
  })
}

const registerErrorHandlers = (app) => {
  app.use(logErrors)
  app.use(errorHandler)
}

module.exports = {
  errorHandler,
  registerErrorHandlers
}

const express = require('express')

const {
  configureGet,
  configurePost,
  getSessionDetails,
  handlePost,
  handleRequestForPath,
  handlePostRedirects,
  renderView,
  sanitize
} = require('./middleware')

const middlewareNoop = (req, res, next) => next()

const handleOptionalMiddleware = (operation, fallback = middlewareNoop) => {
  if (typeof operation === 'undefined') {
    return fallback
  }

  return operation
}

const createRoute = (csrfProtection, steps, router) => (step) =>
  router
    .route(step.path)
    .get(
      csrfProtection,
      configureGet(steps, step),
      getSessionDetails,
      handleRequestForPath(steps),
      renderView(step)
    )
    .post(
      csrfProtection,
      configurePost(steps, step),
      sanitize,
      handleOptionalMiddleware(step.sanitize),
      handleOptionalMiddleware(step.validate),
      getSessionDetails,
      handlePost(steps),
      handleRequestForPath(steps),
      handlePostRedirects(steps),
      renderView(step)
    )

const registerFormRoutes = (csrfProtection, steps, app) => {
  const wizard = express.Router()
  steps.forEach(createRoute(csrfProtection, steps, wizard))
  app.use(wizard)
}

module.exports = {
  registerFormRoutes,
  handleOptionalMiddleware
}

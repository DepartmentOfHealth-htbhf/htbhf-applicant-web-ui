const express = require('express')

const {
  configureGet,
  configurePost,
  getSessionDetails,
  handlePost,
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
      renderView(steps, step)
    )
    .post(
      csrfProtection,
      configurePost(steps, step),
      sanitize,
      handleOptionalMiddleware(step.sanitize),
      handleOptionalMiddleware(step.validate),
      getSessionDetails,
      handlePost(steps),
      renderView(steps, step)
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

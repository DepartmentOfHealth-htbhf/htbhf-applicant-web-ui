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

const createRoute = (config, csrfProtection, steps, router) => (step) =>
  router
    .route(step.path)
    .get(
      csrfProtection,
      configureGet(steps, step),
      getSessionDetails,
      handleRequestForPath(config, steps, step),
      handleOptionalMiddleware(step.behaviourForGet),
      renderView(step)
    )
    .post(
      csrfProtection,
      configurePost(steps, step),
      sanitize,
      handleOptionalMiddleware(step.sanitize),
      handleOptionalMiddleware(step.validate),
      getSessionDetails,
      handleOptionalMiddleware(step.behaviourForPost),
      handlePost(steps, step),
      handleRequestForPath(config, steps, step),
      handlePostRedirects(steps),
      renderView(step)
    )

const registerFormRoutes = (config, csrfProtection, steps, app) => {
  const wizard = express.Router()
  steps.forEach(createRoute(config, csrfProtection, steps, wizard))
  app.use(wizard)
}

module.exports = {
  registerFormRoutes,
  handleOptionalMiddleware
}

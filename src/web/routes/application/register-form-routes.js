const express = require('express')

const { sanitize } = require('./common/sanitize')
const { renderView } = require('./common/render-view')
const { handlePost } = require('./common/handle-post')
const { getSessionDetails } = require('./common/session-details')

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
      getSessionDetails,
      renderView(step.template, step.pageContent, step.next)
    )
    .post(
      csrfProtection,
      sanitize,
      handleOptionalMiddleware(step.sanitize),
      handleOptionalMiddleware(step.validate),
      getSessionDetails,
      handlePost,
      renderView(step.template, step.pageContent, step.next)
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

const express = require('express')

const { renderView } = require('./common/render-view')
const { handlePost } = require('./common/handle-post')
const { getSessionDetails } = require('./common/session-details')

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
      step.sanitize,
      step.validate,
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
  registerFormRoutes
}

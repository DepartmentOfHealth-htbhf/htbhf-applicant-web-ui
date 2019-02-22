const express = require('express')

const {
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

const getPreviousPage = (steps, step) => {
  const index = steps.indexOf(step)

  if (index === -1) {
    throw new Error(`Unable to find ${step} in the list of steps`)
  }

  // first page doesn't have a back link
  if (index > 0) {
    const previousStep = steps[index - 1]
    return previousStep.path
  }
}

const createRoute = (csrfProtection, steps, router) => (step) => {
  const previous = getPreviousPage(steps, step)
  router
    .route(step.path)
    .get(
      csrfProtection,
      getSessionDetails,
      renderView(step.template, step.pageContent, step.next, previous)
    )
    .post(
      csrfProtection,
      configurePost,
      sanitize,
      handleOptionalMiddleware(step.sanitize),
      handleOptionalMiddleware(step.validate),
      getSessionDetails,
      handlePost,
      renderView(step.template, step.pageContent, step.next, previous)
    )
}

const registerFormRoutes = (csrfProtection, steps, app) => {
  const wizard = express.Router()
  steps.forEach(createRoute(csrfProtection, steps, wizard))
  app.use(wizard)
}

module.exports = {
  registerFormRoutes,
  handleOptionalMiddleware,
  getPreviousPage
}

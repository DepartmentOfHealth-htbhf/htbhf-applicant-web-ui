const express = require('express')
const { registerConfirmRoute } = require('./confirm')
const { registerCheckAnswersRoutes } = require('./check-answers')
const { registerTermsAndConditionsRoutes } = require('./terms-and-conditions')

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

const middlewareNoop = () => (req, res, next) => next()

const handleOptionalMiddleware = (args) => (operation, fallback = middlewareNoop) =>
  typeof operation === 'undefined' ? fallback.apply(null, args) : operation.apply(null, args)

const createRoute = (config, csrfProtection, steps, router) => (step) => {
  // Make [config, steps, step] available as arguments to all optional middleware
  const optionalMiddleware = handleOptionalMiddleware([config, steps, step])

  return router
    .route(step.path)
    .get(
      csrfProtection,
      configureGet(steps, step),
      getSessionDetails,
      handleRequestForPath(config, steps, step),
      optionalMiddleware(step.behaviourForGet),
      renderView(step)
    )
    .post(
      csrfProtection,
      configurePost(steps, step),
      sanitize,
      optionalMiddleware(step.sanitize),
      optionalMiddleware(step.validate),
      getSessionDetails,
      optionalMiddleware(step.behaviourForPost),
      handlePost(steps, step),
      handleRequestForPath(config, steps, step),
      handlePostRedirects(steps),
      renderView(step)
    )
}

const registerJourneyRoutes = (config, csrfProtection, steps, app) => {
  const wizard = express.Router()
  steps.forEach(createRoute(config, csrfProtection, steps, wizard))
  app.use(wizard)

  registerCheckAnswersRoutes(steps, config, app)
  registerTermsAndConditionsRoutes(csrfProtection, steps, config, app)
  registerConfirmRoute(config, steps, app)
}

module.exports = {
  registerJourneyRoutes,
  handleOptionalMiddleware
}

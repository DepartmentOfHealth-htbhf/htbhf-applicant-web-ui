const express = require('express')

const {
  registerConfirmRoute,
  registerCheckAnswersRoutes,
  registerTermsAndConditionsRoutes
} = require('./steps')

const {
  configureGet,
  configurePost,
  configureSessionDetails,
  handlePost,
  handleRequestForPath,
  handlePostRedirects,
  renderView,
  sanitize
} = require('./flow-control')

const middlewareNoop = () => (req, res, next) => next()

const handleOptionalMiddleware = (args) => (operation, fallback = middlewareNoop) =>
  typeof operation === 'undefined' ? fallback.apply(null, args) : operation.apply(null, args)

const createRoute = (config, csrfProtection, journey, router) => (step) => {
  const { steps } = journey
  // Make [config, journey, step] available as arguments to all optional middleware
  const optionalMiddleware = handleOptionalMiddleware([config, journey, step])

  return router
    .route(step.path)
    .get(
      csrfProtection,
      configureGet(steps, step),
      configureSessionDetails(journey),
      handleRequestForPath(journey, step),
      optionalMiddleware(step.behaviourForGet),
      renderView(step)
    )
    .post(
      csrfProtection,
      configurePost(steps, step),
      sanitize,
      optionalMiddleware(step.sanitize),
      optionalMiddleware(step.validate),
      configureSessionDetails(journey),
      optionalMiddleware(step.behaviourForPost),
      handlePost(journey, step),
      handleRequestForPath(journey, step),
      handlePostRedirects(journey),
      renderView(step)
    )
}

const registerJourneyRoutes = (config, csrfProtection, app) => (journey) => {
  const wizard = express.Router()
  journey.steps.forEach(createRoute(config, csrfProtection, journey, wizard))
  app.use(wizard)

  registerCheckAnswersRoutes(journey, app)
  registerTermsAndConditionsRoutes(csrfProtection, journey, config, app)
  registerConfirmRoute(journey, app)
}

module.exports = {
  registerJourneyRoutes,
  handleOptionalMiddleware
}

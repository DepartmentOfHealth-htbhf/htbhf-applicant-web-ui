const csrf = require('csurf')
const { registerJourneyRoutes } = require('./register-journey-routes')
const { registerSteps } = require('../register-steps')
const { CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, DECISION_URL, prefixPath } = require('./paths')

const getPathsInSequence = (prefix, steps) => [
  ...steps.map(step => prefixPath(prefix, step.path)),
  prefixPath(prefix, CHECK_ANSWERS_URL),
  prefixPath(prefix, TERMS_AND_CONDITIONS_URL),
  prefixPath(prefix, DECISION_URL)
]

const prefixPathForStep = prefix => step => ({ ...step, path: prefixPath(prefix, step.path) })

const registerJourney = (features) => (journey) => {
  const registeredSteps = registerSteps(features, journey.steps)
  const steps = registeredSteps.map(prefixPathForStep(journey.pathPrefix))
  const pathsInSequence = getPathsInSequence(journey.pathPrefix, registeredSteps)

  return {
    ...journey,
    steps,
    pathsInSequence
  }
}

const registerJourneys = (journeys) => (config, app) => {
  const csrfProtection = csrf()
  journeys
    .map(registerJourney(config.features))
    .forEach(registerJourneyRoutes(config, csrfProtection, app))
}

module.exports = {
  prefixPath,
  getPathsInSequence,
  registerJourney,
  registerJourneys
}

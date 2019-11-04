const csrf = require('csurf')
const { registerJourneyRoutes } = require('./register-journey-routes')
const { registerSteps } = require('../register-steps')
const { CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('./paths')

const getPathsInSequence = (steps) => [...steps.map(step => step.path), CHECK_ANSWERS_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL]

const registerJourney = (features) => (journey) => {
  const steps = registerSteps(features, journey.steps)
  const pathsInSequence = getPathsInSequence(steps)

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
  getPathsInSequence,
  registerJourney,
  registerJourneys
}

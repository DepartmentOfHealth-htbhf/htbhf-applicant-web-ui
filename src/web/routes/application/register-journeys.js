const csrf = require('csurf')
const { registerJourneyRoutes } = require('./register-journey-routes')
const { registerSteps } = require('../register-steps')

const registerJourneys = (journeys) => (config, app) => {
  const csrfProtection = csrf()
  journeys.forEach(journey =>
    registerJourneyRoutes(config, csrfProtection, registerSteps(config.features, journey.steps), app))
}

module.exports = {
  registerJourneys
}

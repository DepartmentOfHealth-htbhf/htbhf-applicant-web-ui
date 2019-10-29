const csrf = require('csurf')
const { partial, evolve } = require('ramda')
const { registerJourneyRoutes } = require('./register-journey-routes')
const { registerSteps } = require('../register-steps')

const journeyTransformations = (config) => ({
  steps: partial(registerSteps, [config.features])
})

const registerJourney = evolve(journeyTransformations)

const registerJourneys = (journeys) => (config, app) => {
  const csrfProtection = csrf()
  journeys
    .map(registerJourney)
    .forEach(registerJourneyRoutes(config, csrfProtection, app))
}

module.exports = {
  registerJourneys
}

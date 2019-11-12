const { path } = require('ramda')
const { JOURNEYS_KEY, STATE_KEY, NEXT_ALLOWED_PATH_KEY } = require('../keys')

const buildSessionForJourney = ({ journeyName, state, nextAllowedPath }) => ({
  [JOURNEYS_KEY]: {
    [journeyName]: {
      [STATE_KEY]: state,
      [NEXT_ALLOWED_PATH_KEY]: nextAllowedPath
    }
  }
})

const JOURNEYS_PATH = ['session', JOURNEYS_KEY]

const getJourneyPath = name => [...JOURNEYS_PATH, name]

const getStateForJourney = name => path([...getJourneyPath(name), STATE_KEY])

const getNextAllowedPathForJourney = (name) => path([...getJourneyPath(name), NEXT_ALLOWED_PATH_KEY])

module.exports = {
  buildSessionForJourney,
  getStateForJourney,
  getNextAllowedPathForJourney
}

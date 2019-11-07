const { JOURNEYS_KEY, NEXT_ALLOWED_PATH_KEY, STATE_KEY } = require('./keys')

const setNextAllowedPath = (req, journey, path) => {
  req.session.nextAllowedStep = path
}

const setJourneySessionProp = (prop) => (req, journey, value) => {
  req.session[JOURNEYS_KEY][journey.name][prop] = value
}

const getJourneySessionProp = (prop) => (req, journey) => req.session[JOURNEYS_KEY][journey.name][prop]

const setNextAllowedPathInSession = setJourneySessionProp(NEXT_ALLOWED_PATH_KEY)

const setStateInSession = setJourneySessionProp(STATE_KEY)

const getNextAllowedPathFromSession = getJourneySessionProp(NEXT_ALLOWED_PATH_KEY)

const getStateFromSession = getJourneySessionProp(STATE_KEY)

module.exports = {
  setNextAllowedPath,
  setNextAllowedPathInSession,
  setStateInSession,
  getNextAllowedPathFromSession,
  getStateFromSession
}

const { pathOr, compose, toPairs } = require('ramda')
const { isUndefined } = require('../../../../../common/predicates')
const { JOURNEYS_KEY, NEXT_ALLOWED_PATH_KEY, STATE_KEY } = require('../keys')

const JOURNEYS_PATH = ['session', JOURNEYS_KEY]

const setJourneySessionProp = (prop) => (req, journey, value) => {
  if (isUndefined(journey)) {
    throw new Error(`No journey defined when trying to set "${prop}" as "${value}"`)
  }

  if (isUndefined(journey.name)) {
    throw new Error(`No name defined for journey when trying to set "${prop}" as "${value}"`)
  }

  req.session[JOURNEYS_KEY][journey.name][prop] = value
}

const getJourneySessionProp = (prop) => (req, journey) => {
  if (isUndefined(journey)) {
    throw new Error(`No journey defined when trying to get "${prop}"`)
  }

  const sessionPath = [...JOURNEYS_PATH, journey.name, prop]
  const sessionProp = pathOr(undefined, sessionPath, req)

  if (isUndefined(sessionProp)) {
    throw new Error(`Property "${prop}" does not exist in session for journey name "${journey.name}"`)
  }

  return sessionProp
}

const setNextAllowedPathInSession = setJourneySessionProp(NEXT_ALLOWED_PATH_KEY)

const setStateInSession = setJourneySessionProp(STATE_KEY)

const getNextAllowedPathFromSession = getJourneySessionProp(NEXT_ALLOWED_PATH_KEY)

const getStateFromSession = getJourneySessionProp(STATE_KEY)

const getJourneysFromSession = compose(toPairs, pathOr({}, JOURNEYS_PATH))

module.exports = {
  setJourneySessionProp,
  getJourneySessionProp,
  setNextAllowedPathInSession,
  setStateInSession,
  getNextAllowedPathFromSession,
  getStateFromSession,
  getJourneysFromSession
}

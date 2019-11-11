const { pathOr } = require('ramda')
const { isUndefined } = require('../../../../../common/predicates')
const { JOURNEYS_KEY, NEXT_ALLOWED_PATH_KEY, STATE_KEY } = require('./keys')

const setNextAllowedPath = (req, journey, path) => {
  req.session.nextAllowedStep = path
}

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

  const sessionPath = ['session', JOURNEYS_KEY, journey.name, prop]
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

module.exports = {
  setJourneySessionProp,
  getJourneySessionProp,
  setNextAllowedPath,
  setNextAllowedPathInSession,
  setStateInSession,
  getNextAllowedPathFromSession,
  getStateFromSession
}

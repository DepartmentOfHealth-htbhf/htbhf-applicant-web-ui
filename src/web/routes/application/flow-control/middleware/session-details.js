const states = require('../states')
const { JOURNEYS_KEY, STEP_DATA_KEY } = require('../keys')

const initialiseProp = (prop, obj, value = {}) => {
  if (!obj.hasOwnProperty(prop)) {
    obj[prop] = value
  }

  return obj
}

const defaultJourneyState = (journey) => ({
  nextAllowedStep: journey.pathsInSequence[0],
  state: states.IN_PROGRESS
})

const configureSessionDetails = (journey) => (req, res, next) => {
  res.locals.claim = req.session.claim
  req.session = initialiseProp(JOURNEYS_KEY, req.session)
  req.session = initialiseProp(STEP_DATA_KEY, req.session)
  req.session.journeys = initialiseProp(journey.name, req.session.journeys, defaultJourneyState(journey))
  next()
}

module.exports = {
  configureSessionDetails
}

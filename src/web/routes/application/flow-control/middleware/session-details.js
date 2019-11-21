const states = require('../states')

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
  req.session = initialiseProp('journeys', req.session)
  req.session.journeys = initialiseProp(journey.name, req.session.journeys, defaultJourneyState(journey))
  next()
}

module.exports = {
  configureSessionDetails
}

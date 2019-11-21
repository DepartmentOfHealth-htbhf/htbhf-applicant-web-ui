const { compose, pluck, map, last, any, equals } = require('ramda')
const { STATE_KEY } = require('../../keys')
const { getJourneysFromSession } = require('../../session-accessors')
const { COMPLETED } = require('../../states')

const stepNotNavigable = (step, req) => step && typeof step.isNavigable === 'function' && !step.isNavigable(req.session)

const getJourneyStatesFromSession = compose(pluck(STATE_KEY), map(last), getJourneysFromSession)

const completedJourneyExistsInSession = compose(any(equals(COMPLETED)), getJourneyStatesFromSession)

module.exports = {
  stepNotNavigable,
  completedJourneyExistsInSession
}

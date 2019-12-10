const { configureSessionDetails, handleRequestForPath } = require('../../flow-control')
const { DECISION_URL, prefixPath } = require('../../paths')
const { getDecisionPageFallback } = require('./decision-fallback')

const registerDecisionRoute = (journey, app) =>
  app.get(
    prefixPath(journey.pathPrefix, DECISION_URL),
    configureSessionDetails(journey),
    handleRequestForPath(journey),
    getDecisionPageFallback
  )

module.exports = {
  registerDecisionRoute
}

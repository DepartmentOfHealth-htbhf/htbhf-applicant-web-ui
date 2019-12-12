const { configureSessionDetails, handleRequestForPath } = require('../../flow-control')
const { DECISION_URL, prefixPath } = require('../../paths')
const { isUndefined } = require('../../../../../common/predicates')
const { getDecisionStatus } = require('./get-decision-status')
const { FAIL } = require('./decision-statuses')
const { getDecisionPageFallback } = require('./decision-fallback')

const STATUS_TEMPLATE_MAP = {
  [FAIL]: 'failure'
}

const getRenderArgsForStatus = (req, status) => {
  const template = STATUS_TEMPLATE_MAP[status]
  return [`decision/${template}`, {
    title: req.t(`decision.${template}.title`),
    body: req.t(`decision.${template}.body`)
  }]
}

// TODO: Remove references to "decision fallback" once all stories for epic HTBHF-2014 (receive my decision) are complete.
// After removal of fallback, update handler to throw error if `decisionStatus` is undefined.
const getDecisionPage = (req, res, next) => {
  const { verificationResult, eligibilityStatus } = req.session
  const decisionStatus = getDecisionStatus({ verificationResult, eligibilityStatus })

  return isUndefined(decisionStatus)
    ? next()
    : res.render(...getRenderArgsForStatus(req, decisionStatus))
}

const registerDecisionRoute = (journey, app) =>
  app.get(
    prefixPath(journey.pathPrefix, DECISION_URL),
    configureSessionDetails(journey),
    handleRequestForPath(journey),
    getDecisionPage,
    getDecisionPageFallback
  )

module.exports = {
  registerDecisionRoute,
  getDecisionPage
}

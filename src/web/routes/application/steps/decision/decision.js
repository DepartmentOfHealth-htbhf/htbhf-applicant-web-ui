const { path } = require('ramda')
const { configureSessionDetails, handleRequestForPath } = require('../../flow-control')
const { DECISION_URL, prefixPath } = require('../../paths')
const { isUndefined } = require('../../../../../common/predicates')
const { getDecisionStatus } = require('./get-decision-status')
const { FAIL, PENDING, SUCCESS } = require('./decision-statuses')

const toPounds = pence => (parseInt(pence, 10) / 100).toFixed(2)

const STATUS_TEMPLATE_MAP = {
  [FAIL]: 'failure',
  [PENDING]: 'pending',
  [SUCCESS]: 'success'
}

const getDecisionPage = (req, res) => {
  const { verificationResult, eligibilityStatus } = req.session
  const decisionStatus = getDecisionStatus({ verificationResult, eligibilityStatus })
  const template = STATUS_TEMPLATE_MAP[decisionStatus]

  if (isUndefined(decisionStatus)) {
    throw new Error(`No decision status generated from EligibilityStatus: ${eligibilityStatus} and VerificationResult: ${JSON.stringify(verificationResult)}`)
  }

  if (decisionStatus === SUCCESS) {
    const totalVoucherValueInPence = path(['session', 'voucherEntitlement', 'totalVoucherValueInPence'], req)

    return res.render('decision', {
      title: req.t('decision.success.title'),
      body: req.t('decision.success.body', {
        totalVoucherValue: toPounds(totalVoucherValueInPence),
        totalVoucherValueForFourWeeks: toPounds(totalVoucherValueInPence * 4)
      }),
      template
    })
  }

  return res.render('decision', {
    title: req.t(`decision.${template}.title`),
    body: req.t(`decision.${template}.body`),
    template
  })
}

const registerDecisionRoute = (journey, app) =>
  app.get(
    prefixPath(journey.pathPrefix, DECISION_URL),
    configureSessionDetails(journey),
    handleRequestForPath(journey),
    getDecisionPage
  )

module.exports = {
  registerDecisionRoute,
  getDecisionPage,
  toPounds
}

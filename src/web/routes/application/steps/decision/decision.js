const { path } = require('ramda')
const { configureSessionDetails, handleRequestForPath } = require('../../flow-control')
const { DECISION_URL, prefixPath } = require('../../paths')
const { ELIGIBLE } = require('../common/constants')

const toPounds = pence => (parseInt(pence, 10) / 100).toFixed(2)

const getDecisionPage = (req, res) => {
  if (req.session.eligibilityStatus === ELIGIBLE) {
    const totalVoucherValueInPence = path(['session', 'voucherEntitlement', 'totalVoucherValueInPence'], req)

    return res.render('decision', {
      title: req.t('decision.title'),
      subTitle: req.t('decision.subTitle', {
        totalVoucherValue: toPounds(totalVoucherValueInPence),
        totalVoucherValueForFourWeeks: toPounds(totalVoucherValueInPence * 4)
      })
    })
  }

  return res.render('unsuccessful-application', {
    title: req.t('unsuccessfulApplication.title'),
    subTitle: req.t('unsuccessfulApplication.subTitle'),
    heading: req.t('unsuccessfulApplication.title'),
    eligibilityStatus: req.session.eligibilityStatus.toLowerCase()
  })
}

const registerDecisionRoute = (journey, app) =>
  app.get(prefixPath(journey.pathPrefix, DECISION_URL), configureSessionDetails(journey), handleRequestForPath(journey), getDecisionPage)

module.exports = {
  toPounds,
  registerDecisionRoute,
  getDecisionPage
}

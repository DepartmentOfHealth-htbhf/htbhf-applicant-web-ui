const { path } = require('ramda')
const { ELIGIBLE } = require('../common/constants')

const toPounds = pence => (parseInt(pence, 10) / 100).toFixed(2)

const getDecisionPageFallback = (req, res) => {
  if (req.session.eligibilityStatus === ELIGIBLE) {
    const totalVoucherValueInPence = path(['session', 'voucherEntitlement', 'totalVoucherValueInPence'], req)

    return res.render('decision-fallback-successful', {
      title: req.t('decisionFallbackSuccessful.title'),
      subTitle: req.t('decisionFallbackSuccessful.subTitle', {
        totalVoucherValue: toPounds(totalVoucherValueInPence),
        totalVoucherValueForFourWeeks: toPounds(totalVoucherValueInPence * 4)
      })
    })
  }

  return res.render('decision-fallback-unsuccessful', {
    title: req.t('decisionFallbackUnsuccessful.title'),
    subTitle: req.t('decisionFallbackUnsuccessful.subTitle'),
    heading: req.t('decisionFallbackUnsuccessful.title'),
    eligibilityStatus: req.session.eligibilityStatus.toLowerCase()
  })
}

module.exports = {
  toPounds,
  getDecisionPageFallback
}

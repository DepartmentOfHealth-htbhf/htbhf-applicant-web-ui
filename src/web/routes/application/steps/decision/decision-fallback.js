const { path } = require('ramda')
const { ELIGIBLE } = require('../common/constants')

const toPounds = pence => (parseInt(pence, 10) / 100).toFixed(2)

const getDecisionPageFallback = (req, res) => {
  if (req.session.eligibilityStatus === ELIGIBLE) {
    const totalVoucherValueInPence = path(['session', 'voucherEntitlement', 'totalVoucherValueInPence'], req)

    return res.render('decision-fallback-successful', {
      title: req.t('decision.title'),
      subTitle: req.t('decision.subTitle', {
        totalVoucherValue: toPounds(totalVoucherValueInPence),
        totalVoucherValueForFourWeeks: toPounds(totalVoucherValueInPence * 4)
      })
    })
  }

  return res.render('decision-fallback-unsuccessful', {
    title: req.t('unsuccessfulApplication.title'),
    subTitle: req.t('unsuccessfulApplication.subTitle'),
    heading: req.t('unsuccessfulApplication.title'),
    eligibilityStatus: req.session.eligibilityStatus.toLowerCase()
  })
}

module.exports = {
  toPounds,
  getDecisionPageFallback
}

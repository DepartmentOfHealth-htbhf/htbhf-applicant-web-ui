const httpStatus = require('http-status-codes')
const { path, isNil } = require('ramda')
const { handleRequestForPath } = require('./middleware')
const { CONFIRM_URL, ELIGIBLE } = require('./common/constants')
const { wrapError } = require('./common/formatters')

const toPounds = pence => (parseInt(pence, 10) / 100).toFixed(2)

const isNilOrLessThanZero = value => isNil(value) || value <= 0

const getConfirmPage = (req, res, next) => {
  if (req.session.eligibilityStatus === ELIGIBLE) {
    const totalVoucherValueInPence = path(['session', 'voucherEntitlement', 'totalVoucherValueInPence'], req)

    if (isNilOrLessThanZero(totalVoucherValueInPence)) {
      const errorMessage = `Invalid voucher value in pence returned from claimant service for ${ELIGIBLE} status: ${totalVoucherValueInPence}`
      return next(wrapError({
        cause: new Error(errorMessage),
        message: errorMessage,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR
      }))
    }

    return res.render('confirm', {
      title: req.t('confirm.title'),
      subTitle: req.t('confirm.subTitle', { totalVoucherValue: toPounds(totalVoucherValueInPence) }),
      totalVoucherValueForFourWeeks: toPounds(totalVoucherValueInPence * 4)
    })
  }

  const eligibilityStatus = req.session.eligibilityStatus.toLowerCase()
  return res.render('unsuccessful-application', {
    title: req.t('unsuccessfulApplication.title'),
    heading: req.t('unsuccessfulApplication.title'),
    content: req.t(`unsuccessfulApplication.content.${eligibilityStatus}`)
  })
}

const registerConfirmRoute = (config, steps, app) => {
  app.get(CONFIRM_URL, handleRequestForPath(config, steps), getConfirmPage)
}

module.exports = {
  toPounds,
  isNilOrLessThanZero,
  registerConfirmRoute,
  getConfirmPage
}

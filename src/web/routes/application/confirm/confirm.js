const httpStatus = require('http-status-codes')
const { path, isNil } = require('ramda')
const { handleRequestForPath } = require('../middleware')
const { CONFIRM_URL, ELIGIBLE } = require('../common/constants')
const { wrapError } = require('../common/formatters')

const toPounds = pence => (parseInt(pence, 10) / 100).toFixed(2)

const isNilOrLteZero = value => isNil(value) || value <= 0

const getTitle = req => {
  if (path(['session', 'claimUpdated'], req) === true) {
    return req.t('confirm.updatedClaimTitle')
  }

  return req.t('confirm.newClaimTitle')
}

const getConfirmPage = (req, res, next) => {
  if (req.session.eligibilityStatus === ELIGIBLE) {
    const totalVoucherValueInPence = path(['session', 'voucherEntitlement', 'totalVoucherValueInPence'], req)

    if (isNilOrLteZero(totalVoucherValueInPence)) {
      const errorMessage = `Invalid voucher value in pence returned from claimant service for ${ELIGIBLE} status: ${totalVoucherValueInPence}`
      return next(wrapError({
        cause: new Error(errorMessage),
        message: errorMessage,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR
      }))
    }

    return res.render('confirm', {
      title: getTitle(req),
      subTitle: req.t('confirm.subTitle',
        {
          totalVoucherValue: toPounds(totalVoucherValueInPence),
          totalVoucherValueForFourWeeks: toPounds(totalVoucherValueInPence * 4)
        })
    })
  }

  const eligibilityStatus = req.session.eligibilityStatus.toLowerCase()
  return res.render('unsuccessful-application', {
    title: req.t('unsuccessfulApplication.title'),
    subTitle: req.t('unsuccessfulApplication.subTitle'),
    heading: req.t('unsuccessfulApplication.title'),
    eligibilityStatus
  })
}

const registerConfirmRoute = (config, journey, app) => {
  app.get(CONFIRM_URL, handleRequestForPath(config, journey), getConfirmPage)
}

module.exports = {
  toPounds,
  isNilOrLteZero,
  registerConfirmRoute,
  getConfirmPage,
  getTitle
}

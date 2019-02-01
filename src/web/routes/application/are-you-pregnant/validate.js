const { check } = require('express-validator/check')
const { isNil } = require('ramda')
const { toDateString } = require('../common/formatters')
const { isValidDate, isDateMoreThanOneMonthAgo, isDateMoreThanEightMonthsInTheFuture } = require('../common/validators')
const { translateValidationMessage } = require('../common/translate-validation-message')
const { YES, NO } = require('./constants')

const isNilOrNo = value => isNil(value) || value === NO

const validateExpectedDeliveryDate = (_, { req }) => {
  if (isNilOrNo(req.body.areYouPregnant)) {
    return true
  }

  const expectedDeliveryDate = toDateString(
    req.body['expectedDeliveryDate-day'],
    req.body['expectedDeliveryDate-month'],
    req.body['expectedDeliveryDate-year']
  )

  if (!isValidDate(expectedDeliveryDate)) {
    throw new Error(req.t('validation:expectedDeliveryDateInvalid'))
  }

  if (isDateMoreThanOneMonthAgo(expectedDeliveryDate)) {
    throw new Error(req.t('validation:expectedDeliveryDateInvalidTooFarInPast'))
  }

  if (isDateMoreThanEightMonthsInTheFuture(expectedDeliveryDate)) {
    throw new Error(req.t('validation:expectedDeliveryDateInvalidTooFarInFuture'))
  }

  return true
}

const validate = [
  check('areYouPregnant').isIn([YES, NO]).withMessage(translateValidationMessage('validation:selectYesOrNo')),
  check('expectedDeliveryDate').custom(validateExpectedDeliveryDate)
]

module.exports = {
  validate,
  validateExpectedDeliveryDate
}

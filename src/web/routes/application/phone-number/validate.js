const { check } = require('express-validator/check')
const { translateValidationMessage } = require('../common/translate-validation-message')

const validatePhoneNumber = (parsedPhoneNumber) => {
  return parsedPhoneNumber.isValid()
}

// TODO DW HTBHF-1564 Update validation messages (awaiting them from UX)
const validate = [
  check('parsedPhoneNumber').not().isEmpty()
    .withMessage(translateValidationMessage('validation:missingPhoneNumber')),

  check('parsedPhoneNumber').custom(validatePhoneNumber)
    .withMessage(translateValidationMessage('validation:phoneNumberInvalid'))
]

module.exports = {
  validate,
  validatePhoneNumber
}

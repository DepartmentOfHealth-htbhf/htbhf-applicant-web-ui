const { check } = require('express-validator/check')
const { parsePhoneNumberFromString } = require('libphonenumber-js')

// TODO DW HTBHF-1564 Update validation messages (awaiting them from UX)
const validatePhoneNumber = (phoneNumber, { req }) => {
  if (!phoneNumber) {
    throw new Error(req.t('validation:missingPhoneNumber'))
  }

  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'GB')

  if (parsedPhoneNumber) {
    if (parsedPhoneNumber.isValid() && phoneNumber.match(/^\+?[\d()\- ]+$/)) {
      return true
    }
  }

  throw new Error(req.t('validation:phoneNumberInvalid'))
}

const validate = [
  check('phoneNumber').custom(validatePhoneNumber)
]

module.exports = {
  validate,
  validatePhoneNumber
}

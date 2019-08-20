const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

// See https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression for regex explanation
const EMAIL_ADDRESS_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const MAX_EMAIL_ADDRESS_LENGTH = 256

const validate = () => [
  check('emailAddress')
    .matches(EMAIL_ADDRESS_REGEX)
    .withMessage(translateValidationMessage('validation:invalidEmail')),

  check('emailAddress')
    .isLength({ max: MAX_EMAIL_ADDRESS_LENGTH })
    .withMessage(translateValidationMessage('validation:invalidEmail'))
]

module.exports = {
  validate,
  EMAIL_ADDRESS_REGEX
}

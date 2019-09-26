const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

const MAX_EMAIL_ADDRESS_LENGTH = 256

const validate = () => [
  check('emailAddress')
    .isEmail()
    .withMessage(translateValidationMessage('validation:invalidEmail'))
]

module.exports = {
  validate,
  MAX_EMAIL_ADDRESS_LENGTH
}

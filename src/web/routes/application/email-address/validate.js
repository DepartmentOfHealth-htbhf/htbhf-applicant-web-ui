const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

const validate = () => [
  check('emailAddress')
    .isEmail()
    .withMessage(translateValidationMessage('validation:invalidEmail'))
]

module.exports = {
  validate
}

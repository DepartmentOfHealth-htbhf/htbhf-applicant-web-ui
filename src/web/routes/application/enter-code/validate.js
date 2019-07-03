const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

const validate = [
  check('confirmationCode')
    .not().isEmpty()
    .withMessage(translateValidationMessage('validation:enterTheSixDigitCodeWeSentYou'))
]

module.exports = {
  validate
}

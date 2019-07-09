const { CONFIRMATION_CODE_SESSION_PROPERTY } = require('../common/constants')
const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

const validateConfirmationCodeIsCorrect = () => (confirmationCode, { req }) => req.body.confirmationCode === req.session[CONFIRMATION_CODE_SESSION_PROPERTY]

const validate = [
  check('confirmationCode').custom(validateConfirmationCodeIsCorrect())
    .withMessage(translateValidationMessage('validation:enterTheSixDigitCodeWeSentYou'))
]

module.exports = {
  validate
}

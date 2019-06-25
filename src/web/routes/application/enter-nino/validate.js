const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

const NINO_PATTERN = /^[a-zA-Z]{2}[\d]{6}[a-dA-D]$/

const validate = [
  check('nino')
    .matches(NINO_PATTERN)
    .withMessage(translateValidationMessage('validation:invalidNino'))
]

module.exports = {
  validate,
  NINO_PATTERN
}

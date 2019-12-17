const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

const NINO_PATTERN = /^(?!BG|GB|NK|KN|TN|NT|ZZ)[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z](\d{6})[A-D]$/

const validateNino = (_, { req }) => NINO_PATTERN.test(req.body.sanitizedNino)

const validate = () => [
  // calling custom validation method as the field in error is'nino', but the field being checked is 'sanitizedNino'.
  // the check method must take in the field name of the input box to correctly display validation errors.
  check('nino')
    .custom(validateNino)
    .withMessage(translateValidationMessage('validation:invalidNino'))
]

module.exports = {
  validate,
  NINO_PATTERN
}

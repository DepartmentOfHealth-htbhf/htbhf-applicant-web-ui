const { check } = require('express-validator/check')

const NINO_PATTERN = /^[a-zA-Z]{2}[\d]{6}[a-dA-D]$/

const validate = [
  check('nino').matches(NINO_PATTERN).withMessage((value, { req }) => req.t('enterNino.invalidNino', { value }))
]

module.exports = {
  validate,
  NINO_PATTERN
}

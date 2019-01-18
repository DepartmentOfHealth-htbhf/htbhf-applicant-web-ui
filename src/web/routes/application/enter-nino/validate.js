const { check } = require('express-validator/check')

const NINO_PATTERN = /^[a-zA-Z]{2}[\d]{6}[a-dA-D]$/
const NINO_INCORRECT_FORMAT_MSG = 'Enter a National Insurance number in the correct format'

const validate = [
  check('nino').matches(NINO_PATTERN).withMessage(NINO_INCORRECT_FORMAT_MSG)
]

module.exports = {
  validate,
  NINO_PATTERN
}

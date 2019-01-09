const { check } = require('express-validator/check')

const FIRST_NAME_MAX_LENGTH = 500
const LAST_NAME_MAX_LENGTH = 500
const MISSING_LAST_NAME_MSG = 'Enter your last or family name'
const FIRST_NAME_TOO_LONG_MSG = 'Enter a shorter first or given name'
const LAST_NAME_TOO_LONG_MSG = 'Enter a shorter last or family name'

const validate = [
  check('firstName').isLength({ max: FIRST_NAME_MAX_LENGTH }).withMessage(FIRST_NAME_TOO_LONG_MSG),
  check('lastName').not().isEmpty().withMessage(MISSING_LAST_NAME_MSG),
  check('lastName').isLength({ max: LAST_NAME_MAX_LENGTH }).withMessage(LAST_NAME_TOO_LONG_MSG)
]

module.exports = {
  validate
}

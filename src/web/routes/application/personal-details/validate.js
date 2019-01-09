const { check } = require('express-validator/check')

const FIRST_NAME_MAX_LENGTH = 500
const LAST_NAME_MAX_LENGTH = 500
const MISSING_LAST_NAME_MSG = 'Missing last name'
const FIRST_NAME_TOO_LONG_MSG = 'First name is too long'
const LAST_NAME_TOO_LONG_MSG = 'Last name is too long'

const validate = [
  check('firstName').isLength({ max: FIRST_NAME_MAX_LENGTH }).withMessage(FIRST_NAME_TOO_LONG_MSG),
  check('lastName').not().isEmpty().withMessage(MISSING_LAST_NAME_MSG),
  check('lastName').isLength({ max: LAST_NAME_MAX_LENGTH }).withMessage(LAST_NAME_TOO_LONG_MSG)
]

module.exports = {
  validate
}

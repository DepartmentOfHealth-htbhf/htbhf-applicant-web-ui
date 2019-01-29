const { check } = require('express-validator/check')
const { translateValidationMessage } = require('../common/translate-validation-message')

const FIRST_NAME_MAX_LENGTH = 500
const LAST_NAME_MAX_LENGTH = 500

const validate = [
  check('firstName')
    .isLength({ max: FIRST_NAME_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:firstNameTooLong')),

  check('lastName')
    .not().isEmpty()
    .withMessage(translateValidationMessage('validation:missingLastName')),

  check('lastName')
    .isLength({ max: LAST_NAME_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:lastNameTooLong'))
]

module.exports = {
  validate
}

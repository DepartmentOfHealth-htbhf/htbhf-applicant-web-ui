const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

const NHS_NUMBER_MAX_LENGTH = 5

const validate = () => [
    check('nhsNumber')
        .not().isEmpty()
        .withMessage(translateValidationMessage('validation:missingNhsNumber')),

    check('nhsNumber')
        .isLength({ max: NHS_NUMBER_MAX_LENGTH })
        .withMessage(translateValidationMessage('validation:nhsNumberTooLong'))
]

module.exports = {
  validate
}

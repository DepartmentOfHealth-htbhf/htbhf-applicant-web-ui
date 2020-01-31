// requiring the express-validator module
const { check } = require('express-validator')
// requiring the translate validation message module
const { translateValidationMessage } = require('../common/translate-validation-message')

// variable with store max length of the input
const NHS_NUMBER_MAX_LENGTH = 5

// Validation checks
const validate = () => [
  // Check to see if the input is within the max length limit which is set 5 and assigned to the variable
  check('nhsNumberUpdate')
    .isLength({ max: NHS_NUMBER_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:nhsNumberTooLong')),

  // Check to see if the input is not empty otherwise fail validation
  check('nhsNumberUpdate')
    .not().isEmpty()
    .withMessage(translateValidationMessage('validation:missingNhsNumber'))
]

module.exports = {
  validate
}

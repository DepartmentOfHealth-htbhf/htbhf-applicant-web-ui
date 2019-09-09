const { check } = require('express-validator')

const { translateValidationMessage } = require('../../common/translate-validation-message')
const { UK_POSTCODE_PATTERN } = require('../constants')

const validate = () => [
  check('postcode')
    .matches(UK_POSTCODE_PATTERN)
    .withMessage(translateValidationMessage('validation:invalidPostcode'))
]

module.exports = {
  validate
}

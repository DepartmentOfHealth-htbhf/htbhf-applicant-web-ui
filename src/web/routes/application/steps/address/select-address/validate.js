const { check } = require('express-validator')

const { translateValidationMessage } = require('../../common/translate-validation-message')

const validate = () => [
  check('selectedAddress')
    .not().isEmpty()
    .withMessage(translateValidationMessage('validation:selectAddress'))
]

module.exports = {
  validate
}

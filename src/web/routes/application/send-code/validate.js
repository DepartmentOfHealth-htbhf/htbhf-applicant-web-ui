const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

const validate = [
  check('sendCode').isIn(['text', 'email']).withMessage(translateValidationMessage('validation:selectTextOrEmailSendCode'))
]

module.exports = {
  validate
}

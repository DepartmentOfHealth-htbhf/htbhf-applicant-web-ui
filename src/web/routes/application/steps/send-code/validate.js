const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

const validate = () => [
  check('channelForCode').isIn(['text', 'email']).withMessage(translateValidationMessage('validation:selectTextOrEmailChannel'))
]

module.exports = {
  validate
}

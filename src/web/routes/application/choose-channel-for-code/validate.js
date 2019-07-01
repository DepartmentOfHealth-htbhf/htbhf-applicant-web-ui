const { check } = require('express-validator')
const { translateValidationMessage } = require('../common/translate-validation-message')

const validate = [
  check('chooseChannelForCode').isIn(['text', 'email']).withMessage(translateValidationMessage('validation:selectTextOrEmailChooseChannelForCode'))
]

module.exports = {
  validate
}

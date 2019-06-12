const { check } = require('express-validator/check')
const { translateValidationMessage } = require('../common/translate-validation-message')
const { YES, NO } = require('../common/constants')

const validate = [
  check('doYouLiveInScotland').isIn([YES, NO]).withMessage(translateValidationMessage('validation:selectYesOrNo'))
]

module.exports = {
  validate
}

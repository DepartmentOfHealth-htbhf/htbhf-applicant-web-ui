const { check } = require('express-validator')

const { translateValidationMessage } = require('../../common/translate-validation-message')
const { checkPostcodeIsValid, checkPostcodeIsNotInChannelOrIslandOrIOM } = require('../validate-common')

const validate = () => [
  // calling custom validation method as the field in error is 'postcode', but the field being checked is 'sanitizedPostcode'.
  // the check method must take in the field name of the input box to correctly display validation errors.
  check('postcode')
    .custom(checkPostcodeIsValid)
    .withMessage(translateValidationMessage('validation:invalidPostcode')),

  check('postcode')
    .custom(checkPostcodeIsNotInChannelOrIslandOrIOM)
    .withMessage(translateValidationMessage('validation:geographicEligibility'))
]

module.exports = {
  validate
}

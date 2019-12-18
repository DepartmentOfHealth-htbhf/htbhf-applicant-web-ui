const { check } = require('express-validator')

const { translateValidationMessage } = require('../../common/translate-validation-message')
const { UK_POSTCODE_PATTERN, CHANNEL_ISLANDS_AND_IOM_POSTCODE_PATTERN } = require('../constants')

const checkPostcodeIsValid = (_, { req }) => UK_POSTCODE_PATTERN.test(req.body.sanitizedPostcode)

const checkPostcodeIsNotInChannelOrIslandOrIOM = (_, { req }) => !CHANNEL_ISLANDS_AND_IOM_POSTCODE_PATTERN.test(req.body.sanitizedPostcode)

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

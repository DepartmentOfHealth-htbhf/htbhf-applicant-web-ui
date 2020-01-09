const { check } = require('express-validator')
const { translateValidationMessage } = require('../../common/translate-validation-message')
const { checkPostcodeIsValid, checkPostcodeIsNotInChannelOrIslandOrIOM } = require('../validate-common')

const ADDRESS_LINE_MAX_LENGTH = 500

const validate = () => [
  check('addressLine1')
    .not().isEmpty()
    .withMessage(translateValidationMessage('validation:missingAddressLine1')),

  check('addressLine1')
    .isLength({ max: ADDRESS_LINE_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:informationTooLong')),

  check('addressLine2')
    .isLength({ max: ADDRESS_LINE_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:informationTooLong')),

  check('townOrCity')
    .isLength({ max: ADDRESS_LINE_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:informationTooLong')),

  check('townOrCity')
    .not().isEmpty()
    .withMessage(translateValidationMessage('validation:missingAddressTownOrCity')),

  check('county')
    .isLength({ max: ADDRESS_LINE_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:informationTooLong')),

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

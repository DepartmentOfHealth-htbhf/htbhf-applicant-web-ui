const { check } = require('express-validator/check')
const { translateValidationMessage } = require('../common/translate-validation-message')

/*
 * Regex for matching UK postcodes matching BS7666 format.
 * see https://www.gov.uk/government/publications/bulk-data-transfer-for-sponsors-xml-schema  The format is in the file BulkDataCommon-v2.1.xsd
 * see https://stackoverflow.com/questions/164979/uk-postcode-regex-comprehensive
 */
const UK_POSTCODE_PATTERN = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
const ADDRESS_LINE_MAX_LENGTH = 500

const validate = [
  check('cardDeliveryAddress.addressLine1')
    .not().isEmpty()
    .withMessage(translateValidationMessage('validation:missingAddressField')),

  check('cardDeliveryAddress.addressLine1')
    .isLength({ max: ADDRESS_LINE_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:informationTooLong')),

  check('cardDeliveryAddress.addressLine2')
    .isLength({ max: ADDRESS_LINE_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:informationTooLong')),

  check('cardDeliveryAddress.townOrCity')
    .isLength({ max: ADDRESS_LINE_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:informationTooLong')),

  check('cardDeliveryAddress.townOrCity')
    .not().isEmpty()
    .withMessage(translateValidationMessage('validation:missingAddressField')),

  check('cardDeliveryAddress.postcode')
    .matches(UK_POSTCODE_PATTERN)
    .withMessage(translateValidationMessage('validation:invalidPostcode'))
]

module.exports = {
  validate,
  UK_POSTCODE_PATTERN
}

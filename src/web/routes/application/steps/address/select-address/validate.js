const { check } = require('express-validator')
const { notIsUndefinedOrNullOrEmpty } = require('../../../../../../common/predicates')

const { translateValidationMessage } = require('../../common/translate-validation-message')

const addressIsSelectedWhenThereAreAddressResults = (selectedAddress, { req }) => {
  // only validate that an address is selected when there are results to select from
  if (notIsUndefinedOrNullOrEmpty(req.session.postcodeLookupResults)) {
    return notIsUndefinedOrNullOrEmpty(selectedAddress)
  }

  return true
}

const validate = () => [
  check('selectedAddress')
    .custom(addressIsSelectedWhenThereAreAddressResults)
    .withMessage(translateValidationMessage('validation:selectAddress'))
]

module.exports = {
  validate,
  addressIsSelectedWhenThereAreAddressResults
}

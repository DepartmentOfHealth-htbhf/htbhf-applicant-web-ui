const pageContent = ({ translate }) => ({
  title: translate('address.title'),
  heading: translate('address.heading'),
  formDescription: translate('address.formDescription'),
  postcodeLabel: translate('address.postcodeLabel'),
  addressNotFound: translate('address.addressNotFound'),
  enterManualAddress: translate('buttons:enterManualAddress'),
  explanation: translate('address.explanation'),
  change: translate('change'),
  continue: translate('buttons:continue'),
  selectAddressLabel: translate('address.selectAddressLabel'),
  addressNotListed: translate('address.addressNotListed')
})

const buildAddressOption = result => ({
  value: result.ADDRESS,
  text: result.ADDRESS
})

const behaviourForGet = () => async (req, res, next) => {
  res.locals.addresses = req.session.postcodeLookupResults.map(buildAddressOption)
  // Manual address is further in the flow than select-address, therefore this line is needed to prevent the state machine from redirecting the user back to select-address.
  req.session.nextAllowedStep = '/manual-address'
  next()
}

const selectAddress = {
  path: '/select-address',
  template: 'select-address',
  pageContent,
  toggle: 'ADDRESS_LOOKUP_ENABLED',
  behaviourForGet
}

module.exports = {
  behaviourForGet,
  selectAddress
}

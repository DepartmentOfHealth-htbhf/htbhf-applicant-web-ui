const pageContent = ({ translate }) => ({
  title: translate('address.title'),
  heading: translate('address.heading'),
  formDescription: translate('address.formDescription'),
  postcodeLabel: translate('address.postcodeLabel'),
  addressNotFound: translate('address.addressNotFound'),
  enterManualAddress: translate('buttons:enterManualAddress'),
  explanation: translate('address.explanation'),
  change: translate('change'),
  continue: translate('buttons:continue')
})

const buildAddressOption = result => ({
  value: result.ADDRESS,
  text: result.ADDRESS
})

const behaviourForGet = () => async (req, res, next) => {
  res.locals.addresses = req.session.postcodeLookupResults.map(buildAddressOption)
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

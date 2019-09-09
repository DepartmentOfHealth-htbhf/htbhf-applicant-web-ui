const { path } = require('ramda')
const { transformAddress } = require('./adapters')

const { addressContentSummary } = require('../content-summary')

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
  addressNotListed: translate('address.addressNotListed'),
  errorWithPostcodeLookup: translate('address.errorWithPostcodeLookup')
})

const buildAddressOption = result => ({
  value: result.ADDRESS,
  text: result.ADDRESS
})

const resetAddressState = (req) => {
  if (req.session.claim.selectedAddress) {
    delete req.session.claim.selectedAddress
  }
}

const behaviourForGet = () => (req, res, next) => {
  resetAddressState(req)
  res.locals.postcodeLookupError = req.session.postcodeLookupError
  if (!res.locals.postcodeLookupError) {
    res.locals.addresses = req.session.postcodeLookupResults.map(buildAddressOption)
    // Manual address is further in the flow than select-address, therefore this line is needed to prevent the state machine from redirecting the user back to select-address.
    req.session.nextAllowedStep = '/manual-address'
  }
  next()
}

const findAddress = (selectedAddress, postcodeLookupResults) => {
  const address = postcodeLookupResults.find(result => result.ADDRESS === selectedAddress)

  if (!address) {
    throw new Error('Unable to find selected address in list of postcode lookup results')
  }

  return address
}

const behaviourForPost = () => (req, res, next) => {
  if (req.body.selectedAddress) {
    const address = findAddress(req.body.selectedAddress, req.session.postcodeLookupResults)
    req.session.claim = {
      ...req.session.claim,
      ...transformAddress(address)
    }
  }

  next()
}

const contentSummary = req => path(['session', 'claim', 'selectedAddress'], req) ? addressContentSummary(req) : null

const selectAddress = {
  path: '/select-address',
  template: 'select-address',
  pageContent,
  toggle: 'ADDRESS_LOOKUP_ENABLED',
  behaviourForGet,
  behaviourForPost,
  contentSummary
}

module.exports = {
  behaviourForGet,
  selectAddress,
  behaviourForPost,
  findAddress,
  contentSummary
}

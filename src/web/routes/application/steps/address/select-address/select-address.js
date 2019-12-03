const { path } = require('ramda')
const { transformAddress } = require('./adapters')
const { addressContentSummary } = require('../content-summary')
const { requestBody } = require('../request-body')
const { stateMachine, actions, setAdditionalDataForStep } = require('../../../flow-control')
const { validate } = require('./validate')

const { SET_NEXT_ALLOWED_PATH } = actions

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

const buildAddressOption = addressId => result => ({
  value: result.ADDRESS,
  text: result.ADDRESS,
  selected: result.UDPRN === addressId
})

const resetAddressState = (req) => {
  if (req.session.claim.selectedAddress) {
    delete req.session.claim.selectedAddress
  }
}

const getAddressDataFromSession = (req, addressId) => {
  const results = req.session.postcodeLookupResults.map(buildAddressOption(addressId))
  const addressCount = {
    value: '',
    text: req.t('address.numberOfAddressesFound', { count: results.length }),
    disabled: true,
    selected: !results.some(addr => addr.selected)
  }
  const addresses = results.length === 0 ? [] : [addressCount, ...results]
  return {
    addresses
  }
}

const behaviourForGet = (config, journey, step) => (req, res, next) => {
  resetAddressState(req)
  const addressId = req.session.claim.addressId
  res.locals.postcodeLookupError = req.session.postcodeLookupError
  if (!res.locals.postcodeLookupError) {
    const addressData = getAddressDataFromSession(req, addressId)
    setAdditionalDataForStep(req, step, addressData)
  }
  // Manual address is further in the flow than select-address, therefore this line is needed to prevent the state machine from redirecting the user back to select-address.
  stateMachine.dispatch(SET_NEXT_ALLOWED_PATH, req, journey, '/manual-address')
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
  validate,
  behaviourForGet,
  behaviourForPost,
  contentSummary,
  requestBody
}

module.exports = {
  behaviourForGet,
  selectAddress,
  behaviourForPost,
  findAddress,
  contentSummary
}

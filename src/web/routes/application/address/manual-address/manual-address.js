const { addressContentSummary } = require('../content-summary')
const { compose, isNil, path } = require('ramda')
const { validate } = require('./validate')
const { sanitize } = require('./sanitize')

const pageContent = ({ translate }) => ({
  title: translate('address.title'),
  heading: translate('address.heading'),
  buildingAndStreetLabel: translate('address.buildingAndStreetLabel'),
  buildingAndStreetLine1of2: translate('address.buildingAndStreetLine1of2'),
  buildingAndStreetLine2of2: translate('address.buildingAndStreetLine2of2'),
  townOrCityLabel: translate('address.townOrCityLabel'),
  countyLabel: translate('address.county'),
  postcodeLabel: translate('address.postcodeLabel'),
  buttonText: translate('buttons:continue'),
  formDescription: translate('address.formDescription'),
  explanation: translate('address.explanation'),
  hint: translate('address.hint')
})

const contentSummary = (req) => {
  if (isNavigable(req.session)) {
    return addressContentSummary(req)
  }
}

const isNavigable = compose(isNil, path(['claim', 'selectedAddress']))

const manualAddress = {
  path: '/manual-address',
  template: 'manual-address',
  pageContent,
  validate,
  sanitize,
  contentSummary,
  isNavigable
}

module.exports = {
  contentSummary,
  manualAddress,
  isNavigable
}

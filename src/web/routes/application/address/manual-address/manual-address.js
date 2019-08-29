const { addressContentSummary } = require('../content-summary')
const { compose, isNil, path } = require('ramda')
const { validate } = require('./validate')
const { sanitize } = require('../sanitize')

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

const contentSummary = req => isNavigable(req.session) ? addressContentSummary(req) : null

const isNavigable = compose(isNil, path(['claim', 'selectedAddress']))

const requestBody = (session) => ({
  address: {
    addressLine1: session.claim.addressLine1,
    addressLine2: session.claim.addressLine2,
    townOrCity: session.claim.townOrCity,
    county: session.claim.county,
    postcode: session.claim.postcode
  }
})

const manualAddress = {
  path: '/manual-address',
  template: 'manual-address',
  pageContent,
  validate,
  sanitize,
  contentSummary,
  isNavigable,
  requestBody
}

module.exports = {
  contentSummary,
  manualAddress,
  isNavigable,
  requestBody
}

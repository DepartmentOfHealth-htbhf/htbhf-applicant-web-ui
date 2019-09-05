const { join, filter, compose, isNil, path } = require('ramda')
const { validate } = require('./validate')
const { sanitize } = require('./sanitize')
const { notIsNilOrEmpty } = require('../../../../../common/predicates')

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

const newLineChar = '\n'
const toMultiLineString = compose(join(newLineChar), filter(notIsNilOrEmpty))

const contentSummary = (req) => ({
  key: req.t('address.summaryKey'),
  value: toMultiLineString([
    req.session.claim.addressLine1,
    req.session.claim.addressLine2,
    req.session.claim.townOrCity,
    req.session.claim.county,
    req.session.claim.postcode
  ])
})

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

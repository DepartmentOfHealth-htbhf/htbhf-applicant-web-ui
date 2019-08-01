const { join, filter, compose } = require('ramda')
const { validate } = require('./validate')
const { sanitize } = require('./sanitize')
const { notIsNilOrEmpty } = require('../../../../common/predicates')

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
    req.session.claim.postcode
  ])
})

const manualAddress = {
  path: '/manual-address',
  next: () => '/phone-number',
  template: 'manual-address',
  pageContent,
  validate,
  sanitize,
  contentSummary
}

module.exports = {
  contentSummary,
  manualAddress
}

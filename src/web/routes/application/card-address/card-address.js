const { join, filter, compose } = require('ramda')
const { validate } = require('./validate')
const { sanitize } = require('./sanitize')
const { CHECK_URL } = require('../common/constants')
const { notIsNilOrEmpty } = require('../common/predicates')

const pageContent = ({ translate }) => ({
  title: translate('cardAddress.title'),
  heading: translate('cardAddress.heading'),
  buildingAndStreetLabel: translate('cardAddress.buildingAndStreetLabel'),
  buildingAndStreetLine1of2: translate('cardAddress.buildingAndStreetLine1of2'),
  buildingAndStreetLine2of2: translate('cardAddress.buildingAndStreetLine2of2'),
  townOrCityLabel: translate('cardAddress.townOrCityLabel'),
  postcodeLabel: translate('cardAddress.postcodeLabel'),
  buttonText: translate('buttons:continue'),
  formDescription: translate('cardAddress.formDescription')
})

const newLineChar = '\n'
const toMultiLineString = compose(join(newLineChar), filter(notIsNilOrEmpty))

const contentSummary = (req, { claim }) => ({
  key: req.t('cardAddress.summaryKey'),
  value: toMultiLineString([
    claim.addressLine1,
    claim.addressLine2,
    claim.townOrCity,
    claim.postcode
  ])
})

const cardAddress = {
  path: '/card-address',
  next: CHECK_URL,
  template: 'card-address',
  pageContent,
  validate,
  sanitize,
  contentSummary
}

module.exports = {
  contentSummary,
  cardAddress
}

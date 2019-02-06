const { join, filter, compose } = require('ramda')
const { validate } = require('./validate')
const { sanitize } = require('./sanitize')
const { CHECK_URL } = require('../constants')
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
const addressToString = compose(join(newLineChar), filter(notIsNilOrEmpty))

const contentSummary = (req) => ({
  key: req.t('cardAddress.summaryKey'),
  value: addressToString([
    req.session.claim.addressLine1,
    req.session.claim.addressLine2,
    req.session.claim.townOrCity,
    req.session.claim.postcode
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

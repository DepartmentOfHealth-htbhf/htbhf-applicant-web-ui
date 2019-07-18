const { join, filter, compose } = require('ramda')
const { validate } = require('./validate')
const { sanitize } = require('./sanitize')
const { notIsNilOrEmpty } = require('../../../../common/predicates')

const pageContent = ({ translate }) => ({
  title: translate('address.title'),
  heading: translate('address.heading'),
  houseNumberOrNameLabel: translate('address.houseNumberOrNameLabel'),
  townOrCityLabel: translate('address.townOrCityLabel'),
  postcodeLabel: translate('address.postcodeLabel'),
  buttonText: translate('buttons:continue'),
  formDescription: translate('address.formDescription'),
  explanation: translate('address.explanation'),
  street: translate('address.street')
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

const address = {
  path: '/address',
  next: () => '/phone-number',
  template: 'address',
  pageContent,
  validate,
  sanitize,
  contentSummary
}

module.exports = {
  contentSummary,
  address
}

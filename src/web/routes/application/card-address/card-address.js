const { validate } = require('./validate')
const { sanitize } = require('./sanitize')

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

const cardAddress = {
  path: '/card-address',
  next: '/check',
  template: 'card-address',
  pageContent,
  validate,
  sanitize
}

module.exports = {
  cardAddress
}

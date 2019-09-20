const { compose, map, pick, prop, propOr } = require('ramda')
const { OS_PLACES_ADDRESS_KEYS } = require('../constants')
const { toTitleCase } = require('../formats')

const RESULTS_PROP = 'results'
const DELIVERY_POINT_ADDRESS_PROP = 'DPA'

const transformAddressField = (address) => ({
  ...address,
  ADDRESS: toTitleCase(address.ADDRESS.replace(`, ${address.POSTCODE}`, ''))
})

const transformAddress = compose(transformAddressField, pick(OS_PLACES_ADDRESS_KEYS), prop(DELIVERY_POINT_ADDRESS_PROP))

const transformOsPlacesApiResponse = compose(map(transformAddress), propOr([], RESULTS_PROP))

module.exports = {
  transformAddress,
  transformOsPlacesApiResponse
}

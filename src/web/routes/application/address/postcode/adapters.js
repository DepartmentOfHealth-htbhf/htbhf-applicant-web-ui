const { compose, map, pick, prop, propOr } = require('ramda')
const { OS_PLACES_ADDRESS_KEYS } = require('../constants')

const RESULTS_PROP = 'results'
const DELIVERY_POINT_ADDRESS_PROP = 'DPA'
const OS_PLACES_TITLE_CASE_KEYS = OS_PLACES_ADDRESS_KEYS.filter(key => !['ADDRESS', 'POSTCODE'].includes(key))

const toTitleCase = (str) => {
  return str.replace(
    /\b\w+/g,
    function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() }
  )
}

const convertCase = (address) => {
  const titleCase = compose(map(toTitleCase), pick(OS_PLACES_TITLE_CASE_KEYS))(address)
  const postcode = address.POSTCODE
  titleCase['ADDRESS'] = toTitleCase(address.ADDRESS.replace(`, ${postcode}`, ''))
  titleCase['POSTCODE'] = postcode
  return titleCase
}

const transformAddress = compose(convertCase, pick(OS_PLACES_ADDRESS_KEYS), prop(DELIVERY_POINT_ADDRESS_PROP))

const transformOsPlacesApiResponse = compose(map(transformAddress), propOr([], RESULTS_PROP))

module.exports = {
  toTitleCase,
  convertCase,
  transformAddress,
  transformOsPlacesApiResponse
}

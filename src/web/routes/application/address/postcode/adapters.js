const { compose, map, pick, prop, propOr } = require('ramda')
const { isString } = require('../../../../../common/predicates')
const { OS_PLACES_ADDRESS_KEYS } = require('../constants')

const RESULTS_PROP = 'results'
const DELIVERY_POINT_ADDRESS_PROP = 'DPA'
const SINGLE_WORD_REGEX = /\b\w+/g

const toTitleCase = (str) => {
  return !isString(str) ? str : str.replace(
    SINGLE_WORD_REGEX,
    function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() }
  )
}

const convertCase = (address) => {
  const titleCase = map(toTitleCase, address)
  titleCase.ADDRESS = toTitleCase(address.ADDRESS.replace(`, ${address.POSTCODE}`, ''))
  titleCase.POSTCODE = address.POSTCODE
  return titleCase
}

const transformAddress = compose(convertCase, pick(OS_PLACES_ADDRESS_KEYS), prop(DELIVERY_POINT_ADDRESS_PROP))

const transformOsPlacesApiResponse = compose(map(transformAddress), propOr([], RESULTS_PROP))

module.exports = {
  SINGLE_WORD_REGEX,
  toTitleCase,
  convertCase,
  transformAddress,
  transformOsPlacesApiResponse
}

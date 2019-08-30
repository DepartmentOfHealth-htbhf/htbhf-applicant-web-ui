const { compose, map, pick, prop, propOr } = require('ramda')

const RESULTS_PROP = 'results'

const DELIVERY_POINT_ADDRESS_PROP = 'DPA'

const ADDRESS_FIELDS = [
  'ADDRESS',
  'ORGANISATION_NAME',
  'SUB_BUILDING_NAME',
  'BUILDING_NAME',
  'BUILDING_NUMBER',
  'DEPENDENT_THOROUGHFARE_NAME',
  'THOROUGHFARE_NAME',
  'DOUBLE_DEPENDENT_LOCALITY',
  'DEPENDENT_LOCALITY',
  'POST_TOWN',
  'POSTCODE',
  'LOCAL_CUSTODIAN_CODE_DESCRIPTION'
]

const transformAddress = compose(pick(ADDRESS_FIELDS), prop(DELIVERY_POINT_ADDRESS_PROP))

const transformOsPlacesApiResponse = compose(map(transformAddress), propOr([], RESULTS_PROP))

module.exports = {
  transformAddress,
  transformOsPlacesApiResponse
}

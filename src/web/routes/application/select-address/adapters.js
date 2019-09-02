const { props, propOr, pickAll, compose, map, join, filter, not, isEmpty, split, head, tail, defaultTo } = require('ramda')
const { THOROUGHFARE_PROPS, BUILDING_NAME_PROPS, LOCALITY_PROPS, DELIMITER } = require('./constants')
const { OS_PLACES_ADDRESS_KEYS } = require('../common/constants')

/**
 * Map address returned from OS places API to format required by claimant service
 * N.B. assumes address has been normalised by /postcode adapter
 *
 * 1. Normalise address by setting any missing fields to a default value of an empty string
 * 2. Construct the 4 possible address parts for address lines 1 and 2:
 *    a) Organisation name
 *    b) Building name
 *    c) Number and street
 *    d) Locality
 * 3. Split a single part address into two parts if a comma exists in the first part
 * 4. Convert a multipart address into two parts by joining all parts except the first with a comma
 */

const isNotEmpty = compose(not, isEmpty)

const joinAddressFields = addressKeys => compose(join(DELIMITER), filter(isNotEmpty), props(addressKeys))

const constructThoroughfare = joinAddressFields(THOROUGHFARE_PROPS)

const constructBuildingName = joinAddressFields(BUILDING_NAME_PROPS)

const constructLocality = joinAddressFields(LOCALITY_PROPS)

const constructNumberAndStreet = addressFields => `${propOr('', 'BUILDING_NUMBER', addressFields)} ${constructThoroughfare(addressFields)}`.trim()

const constructAddressParts = addressFields => [
  addressFields.ORGANISATION_NAME,
  constructBuildingName(addressFields),
  constructNumberAndStreet(addressFields),
  constructLocality(addressFields)
]

const normaliseAddressFields = compose(map(defaultTo('')), pickAll(OS_PLACES_ADDRESS_KEYS))

const splitSinglePartAddress = compose(split(DELIMITER), head)

const parseSinglePartAddress = addressParts => addressParts.length === 1 ? splitSinglePartAddress(addressParts) : addressParts

const joinTail = compose(join(DELIMITER), tail)

const constructTwoPartAddress = addressParts => [head(addressParts), joinTail(addressParts)]

const getAddressParts = compose(filter(isNotEmpty), constructAddressParts, normaliseAddressFields)

const getTwoLineAddressParts = compose(constructTwoPartAddress, parseSinglePartAddress, getAddressParts)

const transformAddress = addressFields => {
  const twoPartAddress = getTwoLineAddressParts(addressFields)

  return {
    addressLine1: twoPartAddress[0],
    addressLine2: twoPartAddress[1],
    townOrCity: addressFields.POST_TOWN,
    county: addressFields.LOCAL_CUSTODIAN_CODE_DESCRIPTION,
    postcode: addressFields.POSTCODE
  }
}

module.exports = {
  transformAddress,
  normaliseAddressFields,
  constructAddressParts,
  joinAddressFields,
  constructThoroughfare,
  constructBuildingName,
  constructLocality,
  constructNumberAndStreet,
  parseSinglePartAddress,
  constructTwoPartAddress
}

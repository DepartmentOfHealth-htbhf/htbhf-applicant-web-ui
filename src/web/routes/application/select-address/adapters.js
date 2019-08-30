const { isNil } = require('ramda')

const clean = (line) => isNil(line) ? '' : line.replace(/ +/g, ' ').trim()

const concatWithComma = (value1, value2) => {
  const cleanValue1 = clean(value1)
  const cleanValue2 = clean(value2)

  if (cleanValue1.length && cleanValue2.length) {
    return `${cleanValue1}, ${cleanValue2}`
  }
  return `${cleanValue1}${cleanValue2}`
}

const getAddressParts = address => {
  const thoroughfare = concatWithComma(address.DEPENDENT_THOROUGHFARE_NAME, address.THOROUGHFARE_NAME)

  return [
    clean(address.ORGANISATION_NAME),
    concatWithComma(address.SUB_BUILDING_NAME, address.BUILDING_NAME),
    `${clean(address.BUILDING_NUMBER)} ${thoroughfare}`,
    concatWithComma(address.DOUBLE_DEPENDENT_LOCALITY, address.DEPENDENT_LOCALITY)
  ]
}

const transformAddress = (address) => {
  let addressParts = getAddressParts(address).map(clean).filter(str => str.length)

  // If only one line exists then split into multiple lines
  if (addressParts.length === 1) {
    addressParts = addressParts[0].split(',').map(clean)
  }

  // We only use first two lines so ensure they contain the whole address
  for (let i = 2; i < addressParts.length; i++) {
    addressParts[1] = concatWithComma(addressParts[1], addressParts[i])
  }

  return {
    addressLine1: addressParts[0],
    addressLine2: addressParts[1] || '',
    townOrCity: address.POST_TOWN,
    county: address.LOCAL_CUSTODIAN_CODE_DESCRIPTION,
    postcode: address.POSTCODE
  }
}

module.exports = {
  transformAddress
}

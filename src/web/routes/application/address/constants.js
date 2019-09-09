/*
 * Regex for matching UK postcodes matching BS7666 format.
 * see https://www.gov.uk/government/publications/bulk-data-transfer-for-sponsors-xml-schema  The format is in the file BulkDataCommon-v2.1.xsd
 * see https://stackoverflow.com/questions/164979/uk-postcode-regex-comprehensive
 */
const UK_POSTCODE_PATTERN = /^([Gg][Ii][Rr] 0[Aa]{2})$|^((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/

const OS_PLACES_ADDRESS_KEYS = [
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

module.exports = {
  UK_POSTCODE_PATTERN,
  OS_PLACES_ADDRESS_KEYS
}

const test = require('tape')
const {
  normaliseAddressFields,
  constructAddressParts,
  joinAddressFields,
  constructThoroughfare,
  constructBuildingName,
  constructLocality,
  constructNumberAndStreet,
  parseSinglePartAddress,
  constructTwoPartAddress
} = require('./adapters')

test('normaliseAddressFields() replaces missing fields with empty strings', (t) => {
  const fields = {
    ADDRESS: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF',
    ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
    BUILDING_NUMBER: '1',
    THOROUGHFARE_NAME: 'VALLEY ROAD',
    POST_TOWN: 'PLYMOUTH',
    POSTCODE: 'PL7 1RF',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
  }

  const expected = {
    ADDRESS: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF',
    ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
    SUB_BUILDING_NAME: '',
    BUILDING_NAME: '',
    BUILDING_NUMBER: '1',
    DEPENDENT_THOROUGHFARE_NAME: '',
    THOROUGHFARE_NAME: 'VALLEY ROAD',
    DOUBLE_DEPENDENT_LOCALITY: '',
    DEPENDENT_LOCALITY: '',
    POST_TOWN: 'PLYMOUTH',
    POSTCODE: 'PL7 1RF',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
  }

  const result = normaliseAddressFields(fields)
  t.deepEqual(expected, result, 'replaces missing fields with empty strings')
  t.end()
})

test('joinAddressFields() correctly joins address fields', (t) => {
  const fields = { NAME: 'NAME', NUMBER: 'NUMBER', STREET: 'STREET' }
  const allFields = ['NAME', 'NUMBER', 'STREET']
  const missingFirstField = ['NUMBER', 'STREET']
  const missingMiddleField = ['NAME', 'STREET']
  const missingLastField = ['NAME', 'NUMBER']
  const singleField = ['NUMBER']

  t.equal(joinAddressFields(allFields)(fields), 'NAME, NUMBER, STREET', 'joins all fields')
  t.equal(joinAddressFields(missingFirstField)(fields), 'NUMBER, STREET', 'joins first two fields')
  t.equal(joinAddressFields(missingMiddleField)(fields), 'NAME, STREET', 'joins first and last fields')
  t.equal(joinAddressFields(missingLastField)(fields), 'NAME, NUMBER', 'joins last two fields')
  t.equal(joinAddressFields(singleField)(fields), 'NUMBER', 'handles single field')
  t.end()
})

test('constructThoroughfare() correctly constructs thoroughfare', (t) => {
  const fields = {
    ADDRESS: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF',
    DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
    THOROUGHFARE_NAME: 'VALLEY ROAD'
  }

  const expected = 'UPPER VALLEY ROAD, VALLEY ROAD'
  const result = constructThoroughfare(fields)

  t.equal(result, expected, 'correctly constructs thoroughfare')
  t.end()
})

test('constructBuildingName() correctly constructs building name', (t) => {
  const fields = {
    ADDRESS: '10, CONCERT SQUARE APARTMENTS, 29, FLEET STREET, LIVERPOOL, L1 4AR',
    SUB_BUILDING_NAME: '10',
    BUILDING_NAME: 'CONCERT SQUARE APARTMENTS'
  }

  const expected = '10, CONCERT SQUARE APARTMENTS'
  const result = constructBuildingName(fields)

  t.equal(result, expected, 'correctly constructs building name')
  t.end()
})

test('constructLocality() correctly constructs locality', (t) => {
  const fields = {
    ADDRESS: 'TRELLEBORG MARINE SYSTEMS LTD, AIRFIELD VIEW, MANOR LANE, HAWARDEN INDUSTRIAL PARK, PENARLAG, GLANNAU DYFRDWY, CH5 3QW',
    DOUBLE_DEPENDENT_LOCALITY: 'HAWARDEN INDUSTRIAL PARK',
    DEPENDENT_LOCALITY: 'PENARLAG'
  }

  const expected = 'HAWARDEN INDUSTRIAL PARK, PENARLAG'
  const result = constructLocality(fields)

  t.equal(result, expected, 'correctly constructs locality')
  t.end()
})

test('constructNumberAndStreet() correctly constructs number and street', (t) => {
  const fields = {
    BUILDING_NUMBER: '1',
    DEPENDENT_THOROUGHFARE_NAME: '',
    THOROUGHFARE_NAME: 'VALLEY ROAD'
  }

  const expected = '1 VALLEY ROAD'
  const result = constructNumberAndStreet(fields)

  t.equal(result, expected, 'correctly constructs number and street')
  t.end()
})

test('constructAddressParts() constructs address parts correctly', (t) => {
  const fields = {
    ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
    SUB_BUILDING_NAME: '10',
    BUILDING_NAME: 'VALLEY APARTMENTS',
    BUILDING_NUMBER: '1',
    DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
    THOROUGHFARE_NAME: 'VALLEY ROAD',
    DOUBLE_DEPENDENT_LOCALITY: 'PLYMOUTH INDUSTRIAL PARK',
    DEPENDENT_LOCALITY: 'EDGE OF PLYMOUTH',
    POST_TOWN: 'PLYMOUTH',
    POSTCODE: 'PL7 1RF',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
  }

  const expected = [
    'ALAN JEFFERY ENGINEERING',
    '10, VALLEY APARTMENTS',
    '1 UPPER VALLEY ROAD, VALLEY ROAD',
    'PLYMOUTH INDUSTRIAL PARK, EDGE OF PLYMOUTH'
  ]

  const result = constructAddressParts(fields)

  t.deepEqual(result, expected, 'constructs address parts correctly')
  t.end()
})

test('parseSinglePartAddress() splits a single part address into multiple parts', (t) => {
  const singlePartAddress = ['29, ACACIA ROAD, ENGLAND']
  const singlePartAddressWithNoComma = ['29 ACACIA ROAD']
  const multiPartAddress = ['29', 'ACACIA ROAD', 'ENGLAND']

  t.deepEqual(parseSinglePartAddress(singlePartAddress), ['29', 'ACACIA ROAD', 'ENGLAND'], 'splits a single part address into two parts')
  t.deepEqual(parseSinglePartAddress(singlePartAddressWithNoComma), ['29 ACACIA ROAD'], 'does not split single part address with no comma')
  t.deepEqual(parseSinglePartAddress(multiPartAddress), ['29', 'ACACIA ROAD', 'ENGLAND'], 'retains multi part address')
  t.end()
})

test('constructTwoPartAddress() converts multipart address to two parts', (t) => {
  const multiPartAddress = ['29', 'ACACIA ROAD', 'ENGLAND', 'SW1 5EE']
  const expected = ['29', 'ACACIA ROAD, ENGLAND, SW1 5EE']
  const result = constructTwoPartAddress(multiPartAddress)

  t.deepEqual(expected, result, 'converts multipart address to two parts')
  t.end()
})

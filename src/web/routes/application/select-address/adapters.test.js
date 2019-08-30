const test = require('tape')
const { transformAddress } = require('./adapters')

test('transformAddress() builds address A', (t) => {
  const address = {
    ADDRESS: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF',
    ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
    BUILDING_NUMBER: '1',
    THOROUGHFARE_NAME: 'VALLEY ROAD',
    POST_TOWN: 'PLYMOUTH',
    POSTCODE: 'PL7 1RF',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
  }

  const expected = {
    addressLine1: 'ALAN JEFFERY ENGINEERING',
    addressLine2: '1 VALLEY ROAD',
    townOrCity: 'PLYMOUTH',
    county: 'CITY OF PLYMOUTH',
    postcode: 'PL7 1RF'
  }

  const result = transformAddress(address)
  t.deepEqual(result, expected, 'builds address A')
  t.end()
})

test('transformAddress() builds address B', (t) => {
  const address = {
    ADDRESS: 'TRELLEBORG MARINE SYSTEMS LTD, AIRFIELD VIEW, MANOR LANE, HAWARDEN INDUSTRIAL PARK, PENARLAG, GLANNAU DYFRDWY, CH5 3QW',
    THOROUGHFARE_NAME: 'MANOR LANE',
    DEPENDENT_LOCALITY: 'PENARLAG',
    POST_TOWN: 'GLANNAU DYFRDWY',
    POSTCODE: 'CH5 3QW',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'FLINTSHIRE',
    ORGANISATION_NAME: 'TRELLEBORG MARINE SYSTEMS LTD',
    DEPENDENT_THOROUGHFARE_NAME: 'AIRFIELD VIEW',
    DOUBLE_DEPENDENT_LOCALITY: 'HAWARDEN INDUSTRIAL PARK'
  }

  const expected = {
    addressLine1: 'TRELLEBORG MARINE SYSTEMS LTD',
    addressLine2: 'AIRFIELD VIEW, MANOR LANE, HAWARDEN INDUSTRIAL PARK, PENARLAG',
    townOrCity: 'GLANNAU DYFRDWY',
    county: 'FLINTSHIRE',
    postcode: 'CH5 3QW'
  }

  const result = transformAddress(address)
  t.deepEqual(result, expected, 'builds address B')
  t.end()
})

test('transformAddress() builds address C', (t) => {
  const address = {
    ADDRESS: '101 ELECTRICITY HOUSE, COLSTON AVENUE, BRISTOL, BS1 4TB',
    THOROUGHFARE_NAME: 'COLSTON AVENUE',
    POST_TOWN: 'BRISTOL',
    POSTCODE: 'BS1 4TB',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'BRISTOL CITY',
    BUILDING_NAME: '101 ELECTRICITY HOUSE'
  }

  const expected = {
    addressLine1: '101 ELECTRICITY HOUSE',
    addressLine2: 'COLSTON AVENUE',
    townOrCity: 'BRISTOL',
    county: 'BRISTOL CITY',
    postcode: 'BS1 4TB'
  }

  const result = transformAddress(address)
  t.deepEqual(result, expected, 'builds address C')
  t.end()
})

test('transformAddress() builds address D', (t) => {
  const address = {
    ADDRESS: '68, PARK ROAD, STAPLETON, BRISTOL, BS16 1AU',
    BUILDING_NUMBER: '68',
    THOROUGHFARE_NAME: 'PARK ROAD',
    DEPENDENT_LOCALITY: 'STAPLETON',
    POST_TOWN: 'BRISTOL',
    POSTCODE: 'BS16 1AU',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'BRISTOL CITY'
  }

  const expected = {
    addressLine1: '68 PARK ROAD',
    addressLine2: 'STAPLETON',
    townOrCity: 'BRISTOL',
    county: 'BRISTOL CITY',
    postcode: 'BS16 1AU'
  }

  const result = transformAddress(address)
  t.deepEqual(result, expected, 'builds address D')
  t.end()
})

test('transformAddress() builds address E', (t) => {
  const address = {
    ADDRESS: '10, CONCERT SQUARE APARTMENTS, 29, FLEET STREET, LIVERPOOL, L1 4AR',
    SUB_BUILDING_NAME: '10',
    BUILDING_NAME: 'CONCERT SQUARE APARTMENTS',
    BUILDING_NUMBER: '29',
    THOROUGHFARE_NAME: 'FLEET STREET',
    POST_TOWN: 'LIVERPOOL',
    POSTCODE: 'L1 4AR',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'LIVERPOOL'
  }

  const expected = {
    addressLine1: '10, CONCERT SQUARE APARTMENTS',
    addressLine2: '29 FLEET STREET',
    townOrCity: 'LIVERPOOL',
    county: 'LIVERPOOL',
    postcode: 'L1 4AR'
  }

  const result = transformAddress(address)
  t.deepEqual(result, expected, 'builds address E')
  t.end()
})

test('transformAddress() builds address F', (t) => {
  const address = {
    ADDRESS: 'GARDEN FLAT, 51, LANSDOWN, STROUD, GL5 1BN',
    SUB_BUILDING_NAME: 'GARDEN FLAT',
    BUILDING_NUMBER: '51',
    THOROUGHFARE_NAME: 'LANSDOWN',
    POST_TOWN: 'STROUD',
    POSTCODE: 'GL5 1BN',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'STROUD'
  }

  const expected = {
    addressLine1: 'GARDEN FLAT',
    addressLine2: '51 LANSDOWN',
    townOrCity: 'STROUD',
    county: 'STROUD',
    postcode: 'GL5 1BN'
  }

  const result = transformAddress(address)
  t.deepEqual(result, expected, 'builds address F')
  t.end()
})

test('transformAddress() builds address G', (t) => {
  const address = {
    ADDRESS: 'THE RETREAT, BLACKERSTONE, DUNS, TD11 3RY',
    SUB_BUILDING_NAME: 'THE RETREAT',
    BUILDING_NAME: 'BLACKERSTONE',
    POST_TOWN: 'DUNS',
    POSTCODE: 'TD11 3RY',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'SCOTTISH BORDERS'
  }

  const expected = {
    addressLine1: 'THE RETREAT',
    addressLine2: 'BLACKERSTONE',
    townOrCity: 'DUNS',
    county: 'SCOTTISH BORDERS',
    postcode: 'TD11 3RY'
  }

  const result = transformAddress(address)
  t.deepEqual(result, expected, 'builds address G')
  t.end()
})

test('transformAddress() builds address H', (t) => {
  const address = {
    ADDRESS: 'BLACKERSTONE SHEPHERDS HOUSE, DUNS, TD11 3RY',
    BUILDING_NAME: 'BLACKERSTONE SHEPHERDS HOUSE',
    POST_TOWN: 'DUNS',
    POSTCODE: 'TD11 3RY',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'SCOTTISH BORDERS'
  }

  const expected = {
    addressLine1: 'BLACKERSTONE SHEPHERDS HOUSE',
    addressLine2: '',
    townOrCity: 'DUNS',
    county: 'SCOTTISH BORDERS',
    postcode: 'TD11 3RY'
  }

  const result = transformAddress(address)
  t.deepEqual(result, expected, 'builds address H')
  t.end()
})

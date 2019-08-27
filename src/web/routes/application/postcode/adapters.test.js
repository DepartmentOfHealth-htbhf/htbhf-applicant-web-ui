const test = require('tape')
const { transformAddress, transformOsPlacesApiResponse } = require('./adapters')
const TEST_FIXTURES = require('./test-fixtures.json')

test('transformAddress() transforms address correctly', (t) => {
  const result = transformAddress(TEST_FIXTURES.results[0])

  const expected = {
    ADDRESS: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF',
    ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
    BUILDING_NUMBER: '1',
    THOROUGHFARE_NAME: 'VALLEY ROAD',
    POST_TOWN: 'PLYMOUTH',
    POSTCODE: 'PL7 1RF',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
  }

  t.deepEqual(result, expected, 'transforms address correctly')
  t.end()
})

test('transformOsPlacesApiResponse() transforms OS Places API response correctly', (t) => {
  const result = transformOsPlacesApiResponse(TEST_FIXTURES)

  const expected = [
    {
      ADDRESS: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF',
      ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
      BUILDING_NUMBER: '1',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
    }, {
      ADDRESS: 'DULUX DECORATOR CENTRE, 2, VALLEY ROAD, PLYMOUTH, PL7 1RF',
      ORGANISATION_NAME: 'DULUX DECORATOR CENTRE',
      BUILDING_NUMBER: '2',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
    }, {
      ADDRESS: 'MILL AUTOS, 3, VALLEY ROAD, PLYMOUTH, PL7 1RF',
      ORGANISATION_NAME: 'MILL AUTOS',
      BUILDING_NUMBER: '3',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
    }
  ]

  t.deepEqual(result, expected, 'transforms OS Places API response correctly')
  t.end()
})

test('transformOsPlacesApiResponse() returns empty array if no results on response', (t) => {
  const apiResponse = { results: undefined }
  const result = transformOsPlacesApiResponse(apiResponse)
  const expected = []

  t.deepEqual(result, expected, 'returns empty array if no results on response')
  t.end()
})

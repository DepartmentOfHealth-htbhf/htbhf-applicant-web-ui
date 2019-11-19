const test = require('tape')
const { transformAddress, transformOsPlacesApiResponse } = require('./adapters')
const TEST_FIXTURES = require('./test-fixtures.json')

test('transformAddress() transforms address correctly', (t) => {
  const result = transformAddress(TEST_FIXTURES.results[0])

  const expected = {
    ADDRESS: 'Alan Jeffery Engineering, 1, Valley Road, Plymouth',
    ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
    BUILDING_NUMBER: '1',
    DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
    THOROUGHFARE_NAME: 'VALLEY ROAD',
    POST_TOWN: 'PLYMOUTH',
    POSTCODE: 'PL7 1RF',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH',
    UDPRN: '50265368'
  }

  t.deepEqual(result, expected, 'transforms address correctly')
  t.end()
})

test('transformOsPlacesApiResponse() transforms OS Places API response correctly', (t) => {
  const result = transformOsPlacesApiResponse(TEST_FIXTURES)

  const expected = [
    {
      ADDRESS: 'Alan Jeffery Engineering, 1, Valley Road, Plymouth',
      ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
      BUILDING_NUMBER: '1',
      DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH',
      UDPRN: '50265368'
    },
    {
      ADDRESS: 'Dulux Decorator Centre, 2, Valley Road, Plymouth',
      ORGANISATION_NAME: 'DULUX DECORATOR CENTRE',
      BUILDING_NUMBER: '2',
      DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH',
      UDPRN: '19000955'
    },
    {
      ADDRESS: 'Mill Autos, 3, Valley Road, Plymouth',
      ORGANISATION_NAME: 'MILL AUTOS',
      BUILDING_NUMBER: '3',
      DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH',
      UDPRN: '19000927'
    },
    {
      ADDRESS: 'Goat Hill Farm, 2, Troll Bridge, Goat Hill, Slaithwaite, Slaith, Huddersfield',
      ORGANISATION_NAME: 'GOAT HILL FARM',
      BUILDING_NUMBER: '2',
      DEPENDENT_THOROUGHFARE_NAME: 'TROLL BRIDGE',
      THOROUGHFARE_NAME: 'GOAT HILL',
      DOUBLE_DEPENDENT_LOCALITY: 'SLAITHWAITE',
      DEPENDENT_LOCALITY: 'SLAITH',
      POST_TOWN: 'HUDDERSFIELD',
      POSTCODE: 'HD7 5UZ',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'KIRKLEES',
      UDPRN: '10668197'
    },
    {
      ADDRESS: '10a, Mayfield Avenue, Weston-Super-Mare',
      BUILDING_NAME: '10A',
      THOROUGHFARE_NAME: 'MAYFIELD AVENUE',
      POST_TOWN: 'WESTON-SUPER-MARE',
      POSTCODE: 'BS22 6AA',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'NORTH SOMERSET',
      UDPRN: '2916679'
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

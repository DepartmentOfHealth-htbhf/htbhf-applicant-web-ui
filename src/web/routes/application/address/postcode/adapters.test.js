const test = require('tape')
const { transformAddress, transformOsPlacesApiResponse, toTitleCase, convertCase } = require('./adapters')
const TEST_FIXTURES = require('./test-fixtures.json')

test('toTitleCase() should uppercase the first letter of every word', (t) => {
  const result = toTitleCase('10A, MY STREET, WESTON-SUPER-MARE')

  const expected = '10a, My Street, Weston-Super-Mare'

  t.equals(result, expected, 'transforms string to title case correctly')
  t.end()
})

test('convertCase() should convert the case of the address to title case', (t) => {
  const original = {
    ADDRESS: '10A, MAYFIELD AVENUE, WESTON-SUPER-MARE, BS22 6AA',
    BUILDING_NAME: '10A',
    THOROUGHFARE_NAME: 'MAYFIELD AVENUE',
    POST_TOWN: 'WESTON-SUPER-MARE',
    POSTCODE: 'BS22 6AA',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'NORTH SOMERSET'
  }
  const result = convertCase(original)

  const expected = {
    ADDRESS: '10a, Mayfield Avenue, Weston-Super-Mare',
    BUILDING_NAME: '10a',
    THOROUGHFARE_NAME: 'Mayfield Avenue',
    POST_TOWN: 'Weston-Super-Mare',
    POSTCODE: 'BS22 6AA',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'North Somerset'
  }

  t.deepEqual(result, expected, 'converts case of an address correctly')
  t.end()
})

test('transformAddress() transforms address correctly', (t) => {
  const result = transformAddress(TEST_FIXTURES.results[0])

  const expected = {
    ADDRESS: 'Alan Jeffery Engineering, 1, Valley Road, Plymouth',
    ORGANISATION_NAME: 'Alan Jeffery Engineering',
    BUILDING_NUMBER: '1',
    THOROUGHFARE_NAME: 'Valley Road',
    DEPENDENT_THOROUGHFARE_NAME: 'Upper Valley Road',
    POST_TOWN: 'Plymouth',
    POSTCODE: 'PL7 1RF',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'City Of Plymouth'
  }

  t.deepEqual(result, expected, 'transforms address correctly')
  t.end()
})

test('transformOsPlacesApiResponse() transforms OS Places API response correctly', (t) => {
  const result = transformOsPlacesApiResponse(TEST_FIXTURES)

  const expected = [
    {
      ADDRESS: 'Alan Jeffery Engineering, 1, Valley Road, Plymouth',
      ORGANISATION_NAME: 'Alan Jeffery Engineering',
      BUILDING_NUMBER: '1',
      THOROUGHFARE_NAME: 'Valley Road',
      DEPENDENT_THOROUGHFARE_NAME: 'Upper Valley Road',
      POST_TOWN: 'Plymouth',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'City Of Plymouth'
    }, {
      ADDRESS: 'Dulux Decorator Centre, 2, Valley Road, Plymouth',
      ORGANISATION_NAME: 'Dulux Decorator Centre',
      BUILDING_NUMBER: '2',
      THOROUGHFARE_NAME: 'Valley Road',
      DEPENDENT_THOROUGHFARE_NAME: 'Upper Valley Road',
      POST_TOWN: 'Plymouth',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'City Of Plymouth'
    }, {
      ADDRESS: 'Mill Autos, 3, Valley Road, Plymouth',
      ORGANISATION_NAME: 'Mill Autos',
      BUILDING_NUMBER: '3',
      THOROUGHFARE_NAME: 'Valley Road',
      DEPENDENT_THOROUGHFARE_NAME: 'Upper Valley Road',
      POST_TOWN: 'Plymouth',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'City Of Plymouth'
    }, {
      ADDRESS: 'Goat Hill Farm, 2, Troll Bridge, Goat Hill, Slaithwaite, Slaith, Huddersfield',
      ORGANISATION_NAME: 'Goat Hill Farm',
      BUILDING_NUMBER: '2',
      THOROUGHFARE_NAME: 'Goat Hill',
      DEPENDENT_THOROUGHFARE_NAME: 'Troll Bridge',
      DOUBLE_DEPENDENT_LOCALITY: 'Slaithwaite',
      DEPENDENT_LOCALITY: 'Slaith',
      POST_TOWN: 'Huddersfield',
      POSTCODE: 'HD7 5UZ',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'Kirklees'
    }, {
      ADDRESS: '10a, Mayfield Avenue, Weston-Super-Mare',
      BUILDING_NAME: '10a',
      THOROUGHFARE_NAME: 'Mayfield Avenue',
      POST_TOWN: 'Weston-Super-Mare',
      POSTCODE: 'BS22 6AA',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'North Somerset'
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

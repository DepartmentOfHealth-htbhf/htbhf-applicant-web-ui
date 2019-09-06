const test = require('tape')
const { assocPath } = require('ramda')
const { contentSummary, isNavigable } = require('./manual-address')

const req = {
  t: string => string,
  session: {
    claim: {
      addressLine1: 'Flat b',
      addressLine2: '221 Baker street',
      townOrCity: 'London',
      county: 'Devon',
      postcode: 'aa1 1ab'
    }
  }
}

test('Address contentSummary() should return content summary in correct format', (t) => {
  const result = contentSummary(req)
  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\n221 Baker street\nLondon\nDevon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

test('Address contentSummary() should return content summary in correct format without address line 2', (t) => {
  const testReq = assocPath(['session', 'claim', 'addressLine2'], '', req)
  const result = contentSummary(testReq)
  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\nLondon\nDevon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format without address line 2')
  t.end()
})

test('Address contentSummary() should return content summary in correct format without county', (t) => {
  const testReq = assocPath(['session', 'claim', 'county'], '', req)
  const result = contentSummary(testReq)
  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\n221 Baker street\nLondon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format without address line 2')
  t.end()
})

test('Address contentSummary() should return content summary in correct format with address line 2 undefined', (t) => {
  const testReq = assocPath(['session', 'claim', 'addressLine2'], undefined, req)
  const result = contentSummary(testReq)
  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\nLondon\nDevon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format with address line 2 undefined')
  t.end()
})

test('Address contentSummary() is null when there is a selected address on the session', (t) => {
  const testReq = assocPath(['session', 'claim', 'selectedAddress'], 'test address', req)

  const result = contentSummary(testReq)

  t.equal(result, null, 'should return null when there is a selected address on the session')
  t.end()
})

test('Address contentSummary() should return content summary in correct format with county undefined', (t) => {
  const testReq = assocPath(['session', 'claim', 'county'], undefined, req)
  const result = contentSummary(testReq)
  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\n221 Baker street\nLondon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format with address line 2 undefined')
  t.end()
})

test('isNavigable() returns true when there is no session', (t) => {
  const result = isNavigable(undefined)

  t.equal(result, true, 'Should return true when there is no session')
  t.end()
})

test('isNavigable() returns true when there is no selected address', (t) => {
  const session = {
    claim: {}
  }

  const result = isNavigable(session)

  t.equal(result, true, 'Should return true when there is no session')
  t.end()
})

test('isNavigable() returns false when there is a selected address', (t) => {
  const session = {
    claim: {
      selectedAddress: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF'
    }
  }

  const result = isNavigable(session)

  t.equal(result, false, 'Should return true when there is no session')
  t.end()
})

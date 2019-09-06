const test = require('tape')

const { addressContentSummary } = require('./content-summary')

test('contentSummary() should return content summary in correct format', (t) => {
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

  const result = addressContentSummary(req)

  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\n221 Baker street\nLondon\nDevon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

test('contentSummary() should return content summary in correct format with no county', (t) => {
  const req = {
    t: string => string,
    session: {
      claim: {
        addressLine1: 'Flat b',
        addressLine2: '221 Baker street',
        townOrCity: 'London',
        postcode: 'aa1 1ab'
      }
    }
  }

  const result = addressContentSummary(req)

  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\n221 Baker street\nLondon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format with no county')
  t.end()
})

test('contentSummary() should return content summary in correct format with no addressLine2', (t) => {
  const req = {
    t: string => string,
    session: {
      claim: {
        addressLine1: 'Flat b',
        townOrCity: 'London',
        county: 'Devon',
        postcode: 'aa1 1ab'
      }
    }
  }

  const result = addressContentSummary(req)

  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\nLondon\nDevon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format with no addressLine2')
  t.end()
})

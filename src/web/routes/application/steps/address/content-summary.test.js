const test = require('tape')

const { addressContentSummary } = require('./content-summary')

test('contentSummary() should return content summary in correct format', (t) => {
  const req = {
    t: string => string,
    session: {
      claim: {
        addressLine1: 'Flat b',
        addressLine2: '123 Fake Street',
        townOrCity: 'Springfield',
        county: 'Devon',
        postcode: 'bs1 4tb'
      }
    }
  }

  const result = addressContentSummary(req)

  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\n123 Fake Street\nSpringfield\nDevon\nbs1 4tb'
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
        addressLine2: '123 Fake Street',
        townOrCity: 'Springfield',
        postcode: 'bs1 4tb'
      }
    }
  }

  const result = addressContentSummary(req)

  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\n123 Fake Street\nSpringfield\nbs1 4tb'
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
        townOrCity: 'Springfield',
        county: 'Devon',
        postcode: 'bs1 4tb'
      }
    }
  }

  const result = addressContentSummary(req)

  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\nSpringfield\nDevon\nbs1 4tb'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format with no addressLine2')
  t.end()
})

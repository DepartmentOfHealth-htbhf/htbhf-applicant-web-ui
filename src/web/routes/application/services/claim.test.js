const test = require('tape')
const { setKey, setKeys, getKey, get } = require('./claim')

const createRequestObject = (claim = {}) => ({
  session: {
    claim: {
      some: 'value',
      ...claim
    }
  }
})

test('Claim service setKey() sets key on claim', (t) => {
  const req = createRequestObject()

  const expected = {
    session: {
      claim: {
        some: 'value',
        new: 'value'
      }
    }
  }

  setKey(req)('new', 'value')

  t.deepEqual(req, expected, 'sets key on claim')
  t.end()
})

test('Claim service setKeys() sets valid keys on claim', (t) => {
  const req = createRequestObject()
  const validKeys = ['valid', 'allowed']

  const keys = {
    valid: 'key',
    allowed: 'key',
    invalid: 'key'
  }

  const expected = {
    session: {
      claim: {
        some: 'value',
        valid: 'key',
        allowed: 'key'
      }
    }
  }

  setKeys(validKeys, req)(keys)

  t.deepEqual(req, expected, 'sets valid keys on claim')
  t.end()
})

test('Claim service getKey() gets key from claim', (t) => {
  const req = createRequestObject({ value: 'that I want to get' })
  const expected = 'that I want to get'
  const result = getKey(req)('value')

  t.equal(result, expected, 'gets key from claim')
  t.end()
})

test('Claim service get() gets claim', (t) => {
  const req = createRequestObject({ other: 'value' })
  const expected = {
    some: 'value',
    other: 'value'
  }
  const result = get(req)()

  t.deepEqual(result, expected, 'gets claim')
  t.end()
})

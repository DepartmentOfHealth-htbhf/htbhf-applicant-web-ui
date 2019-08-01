const test = require('tape')
const { assocPath } = require('ramda')

const { applyExpressValidation } = require('../../common/test/apply-express-validation')
const { validate } = require('../validate')

// Create a string 501 characters long
const LONG_STRING = new Array(502).join('A')

const translate = string => string

const req = {
  t: translate,
  body: {
    addressLine1: 'Flat B',
    addressLine2: '221 Baker Street',
    townOrCity: 'London',
    county: 'Greater London',
    postcode: 'AA1 1AA'
  }
}

test('validation middleware passes with valid address', async (t) => {
  const testReq = { ...req }

  const result = await applyExpressValidation(testReq, validate)
  t.equal(result.isEmpty(), true)
  t.end()
})

test('validation middleware errors for empty address line 1 field', async (t) => {
  const testReq = assocPath(['body', 'addressLine1'], null, req)

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'addressLine1', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:missingAddressField', 'error should have correct message')
  t.end()
})

test('validation middleware errors for empty town or city field', async (t) => {
  const testReq = assocPath(['body', 'townOrCity'], null, req)

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'townOrCity', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:missingAddressField', 'error should have correct message')
  t.end()
})

test('validation middleware errors for empty county field', async (t) => {
  const testReq = assocPath(['body', 'county'], null, req)

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'county', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:missingAddressField', 'error should have correct message')
  t.end()
})

test('validation middleware errors for empty postcode field', async (t) => {
  const testReq = assocPath(['body', 'postcode'], null, req)

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'postcode', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:invalidPostcode', 'error should have correct message')
  t.end()
})

test('validation middleware errors for invalid postcode field', async (t) => {
  const testReq = assocPath(['body', 'postcode'], 'A1', req)

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'postcode', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:invalidPostcode', 'error should have correct message')
  t.end()
})

test('validation middleware errors for address line 1 being too long', async (t) => {
  const testReq = assocPath(['body', 'addressLine1'], LONG_STRING, req)

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'addressLine1', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:informationTooLong', 'error should have correct message')
  t.end()
})

test('validation middleware errors for address line 2 being too long', async (t) => {
  const testReq = assocPath(['body', 'addressLine2'], LONG_STRING, req)

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'addressLine2', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:informationTooLong', 'error should have correct message')
  t.end()
})

test('validation middleware errors for town or city field being too long', async (t) => {
  const testReq = assocPath(['body', 'townOrCity'], LONG_STRING, req)

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'townOrCity', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:informationTooLong', 'error should have correct message')
  t.end()
})

test('validation middleware errors for county field being too long', async (t) => {
  const testReq = assocPath(['body', 'county'], LONG_STRING, req)

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'county', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:informationTooLong', 'error should have correct message')
  t.end()
})

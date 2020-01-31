const test = require('tape')
const { requestBody } = require('./request-body')

const req = {
  session: {
    claim: {
      addressLine1: 'Flat b',
      addressLine2: '123 Fake Street',
      townOrCity: 'Springfield',
      county: 'Devon',
      postcode: 'bs1  4tb',
      sanitizedPostcode: 'BS1 4TB'
    }
  }
}

test('requestBody() returns request body in correct format', (t) => {
  const result = requestBody(req.session)

  const expected = {
    address: {
      addressLine1: 'Flat b',
      addressLine2: '123 Fake Street',
      townOrCity: 'Springfield',
      county: 'Devon',
      postcode: 'BS1 4TB'
    }
  }

  t.deepEqual(result, expected, 'returns request body in correct format')
  t.end()
})

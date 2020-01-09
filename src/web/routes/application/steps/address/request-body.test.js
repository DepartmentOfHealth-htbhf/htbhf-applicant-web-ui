const test = require('tape')
const { requestBody } = require('./request-body')

const req = {
  session: {
    claim: {
      addressLine1: 'Flat b',
      addressLine2: '221 Baker street',
      townOrCity: 'London',
      county: 'Devon',
      postcode: 'aa1  1ab',
      sanitizedPostcode: 'AA1 1AB'
    }
  }
}

test('requestBody() returns request body in correct format', (t) => {
  const result = requestBody(req.session)

  const expected = {
    address: {
      addressLine1: 'Flat b',
      addressLine2: '221 Baker street',
      townOrCity: 'London',
      county: 'Devon',
      postcode: 'AA1 1AB'
    }
  }

  t.deepEqual(result, expected, 'returns request body in correct format')
  t.end()
})

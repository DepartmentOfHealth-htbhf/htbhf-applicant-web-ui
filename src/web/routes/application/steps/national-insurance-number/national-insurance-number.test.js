const test = require('tape')
const { nationalInsuranceNumber, requestBody } = require('./national-insurance-number')

const req = {
  t: string => string,
  session: {
    claim: {
      nino: 'QQ 12 34 56 C',
      sanitizedNino: 'QQ123456C'
    }
  }
}

test('National insurance number contentSummary() should return content summary in entered format', (t) => {
  const result = nationalInsuranceNumber.contentSummary(req)

  const expected = {
    key: 'nationalInsuranceNumber.summaryKey',
    value: 'QQ 12 34 56 C'
  }

  t.deepEqual(result, expected, 'should return content summary in entered format')
  t.end()
})

test('requestBody() returns request body in correct format', (t) => {
  const result = requestBody(req.session)

  const expected = {
    nino: 'QQ123456C'
  }

  t.deepEqual(result, expected, 'returns request body in sanitized format')
  t.end()
})

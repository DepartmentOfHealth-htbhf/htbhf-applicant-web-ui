const test = require('tape')
const { nationalInsuranceNumber } = require('./national-insurance-number')

const req = {
  t: string => string,
  session: {
    claim: {
      nino: 'QQ123456C'
    }
  }
}

test('National insurance number contentSummary() should return content summary in correct format', (t) => {
  const result = nationalInsuranceNumber.contentSummary(req)

  const expected = {
    key: 'nationalInsuranceNumber.summaryKey',
    value: 'QQ123456C'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

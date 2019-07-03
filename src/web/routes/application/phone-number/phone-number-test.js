const test = require('tape')
const { contentSummary } = require('./phone-number')

const req = {
  t: string => string,
  session: {
    claim: {
      phoneNumber: '07123456789'
    }
  }
}

test('Enter name contentSummary() should return content summary in correct format', (t) => {
  const result = contentSummary(req)

  const expected = {
    key: 'phoneNumber.summaryKey',
    value: '07123456789'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})
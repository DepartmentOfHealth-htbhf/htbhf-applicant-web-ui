const test = require('tape')
const { enterDob } = require('./enter-dob')

const req = {
  t: string => string,
  session: {
    claim: {
      'dateOfBirth-day': '30',
      'dateOfBirth-month': '05',
      'dateOfBirth-year': '1920'
    }
  }
}

test('Enter dob contentSummary() should return content summary in correct format', (t) => {
  const result = enterDob.contentSummary(req)

  const expected = {
    key: 'enterDob.summaryKey',
    value: '30 05 1920'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

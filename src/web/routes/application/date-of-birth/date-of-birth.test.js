const test = require('tape')
const { dateOfBirth } = require('./date-of-birth')

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

test('Date of birth contentSummary() should return content summary in correct format', (t) => {
  const result = dateOfBirth.contentSummary(req)

  const expected = {
    key: 'dateOfBirth.summaryKey',
    value: '30 May 1920'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

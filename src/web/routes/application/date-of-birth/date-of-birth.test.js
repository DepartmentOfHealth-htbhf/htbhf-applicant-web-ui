const test = require('tape')
const { contentSummary, requestBody } = require('./date-of-birth')

const req = {
  t: string => string,
  session: {
    claim: {
      'dateOfBirth-day': '30',
      'dateOfBirth-month': '05',
      'dateOfBirth-year': '1920',
      'dateOfBirth': '1920-05-30'
    }
  }
}

test('Date of birth contentSummary() should return content summary in correct format', (t) => {
  const result = contentSummary(req)

  const expected = {
    key: 'dateOfBirth.summaryKey',
    value: '30 May 1920'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

test('Date of birth requestBody() should return request body in correct format', (t) => {
  const result = requestBody(req.session)

  const expected = {
    'dateOfBirth': '1920-05-30'
  }

  t.deepEqual(result, expected, 'should return request body in correct format')
  t.end()
})

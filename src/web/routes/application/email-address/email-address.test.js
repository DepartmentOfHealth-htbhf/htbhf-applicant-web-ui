const test = require('tape')
const { contentSummary } = require('./email-address')

const req = {
  t: string => string,
  session: {
    claim: {
      emailAddress: 'test@email.com'
    }
  }
}

test('Enter name contentSummary() should return content summary in correct format', (t) => {
  const result = contentSummary(req)

  const expected = {
    key: 'emailAddress.summaryKey',
    value: 'test@email.com'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

const test = require('tape')
const { contentSummary, requestBody } = require('./name')

const req = {
  t: string => string,
  session: {
    claim: {
      firstName: 'Lisa',
      lastName: 'Smith'
    }
  }
}

test('Enter name contentSummary() should return content summary in correct format', (t) => {
  const result = contentSummary(req)

  const expected = {
    key: 'name.summaryKey',
    value: 'Lisa Smith'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

test('requestBody() returns request body in correct format', (t) => {
  const result = requestBody(req.session)

  const expected = {
    firstName: 'Lisa',
    lastName: 'Smith'
  }

  t.deepEqual(result, expected, 'returns request body in correct format')
  t.end()
})

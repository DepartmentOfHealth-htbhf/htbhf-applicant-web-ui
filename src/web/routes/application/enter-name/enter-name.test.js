const test = require('tape')
const { contentSummary } = require('./enter-name')

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
    key: 'enterName.summaryKey',
    value: 'Lisa Smith'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

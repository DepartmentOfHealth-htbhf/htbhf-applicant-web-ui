const test = require('tape')
const { enterNino } = require('./enter-nino')

const req = {
  t: string => string,
  session: {
    claim: {
      nino: 'QQ123456C'
    }
  }
}

test('Enter nino contentSummary() should return content summary in correct format', (t) => {
  const result = enterNino.contentSummary(req)

  const expected = {
    key: 'enterNino.summaryKey',
    value: 'QQ123456C'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

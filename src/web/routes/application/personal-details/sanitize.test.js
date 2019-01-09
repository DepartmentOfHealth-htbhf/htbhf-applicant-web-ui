const test = require('tape')
const { trimValues } = require('./sanitize')

test('trimValues', (t) => {
  const body = {
    lastName: '    whitespace     '
  }
  const expected = {
    lastName: 'whitespace'
  }
  const result = trimValues(body)

  t.deepEqual(result, expected, 'it should remove trailing white space')
  t.end()
})

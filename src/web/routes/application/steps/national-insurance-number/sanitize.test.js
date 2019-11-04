const test = require('tape')
const { removeWhiteSpace } = require('./sanitize')

test('removeWhiteSpace', (t) => {
  const nino = 'qq 12 34 56 c '
  const expected = 'qq123456c'

  const result = removeWhiteSpace(nino)

  t.deepEqual(result, expected, 'it should remove all white space')
  t.end()
})

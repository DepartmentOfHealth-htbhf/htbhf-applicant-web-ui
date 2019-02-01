const test = require('tape')
const { replaceMultipleSpacesWithOne } = require('./sanitize')

test('replaceMultipleSpacesWithOne', (t) => {
  const postcode = 'aa1     1aa'
  const expected = 'aa1 1aa'

  const result = replaceMultipleSpacesWithOne(postcode)

  t.deepEqual(result, expected, 'it should replace multiple spaces with a single one')
  t.end()
})

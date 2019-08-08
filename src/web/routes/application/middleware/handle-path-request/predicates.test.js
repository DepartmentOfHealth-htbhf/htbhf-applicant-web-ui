const test = require('tape')
const { isPathInSequence } = require('./handle-path-request')

test('isPathInSequence()', (t) => {
  const sequence = ['/first', '/second', '/third']

  t.equal(isPathInSequence('/second', sequence), true, 'returns true for a path in the sequence')
  t.equal(isPathInSequence('/not-in-sequence', sequence), false, 'returns false for a path not in the sequence')
  t.end()
})

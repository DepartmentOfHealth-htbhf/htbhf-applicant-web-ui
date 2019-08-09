const test = require('tape')
const { isPathInApplicationFlow } = require('./predicates')

test('isPathInApplicationFlow()', (t) => {
  const sequence = ['/first', '/second', '/third']

  t.equal(isPathInApplicationFlow('/second', sequence), true, 'returns true for a path in the sequence')
  t.equal(isPathInApplicationFlow('/not-in-sequence', sequence), false, 'returns false for a path not in the sequence')
  t.end()
})

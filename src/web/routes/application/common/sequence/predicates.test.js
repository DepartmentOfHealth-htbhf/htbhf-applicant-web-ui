const test = require('tape')
const { isPathInSequence } = require('./predicates')

test('isPathInSequence() returns true if path is in sequence', (t) => {
  const steps = [{ path: '/first-in-sequence' }, { path: '/second-in-sequence' }, { path: '/third-in-sequence' }]
  const result = isPathInSequence(steps, '/second-in-sequence')
  t.equal(result, true, 'returns true if path is in sequence')
  t.end()
})

test('isPathInSequence() returns false if path is not in sequence', (t) => {
  const steps = [{ path: '/first-in-sequence' }, { path: '/second-in-sequence' }, { path: '/third-in-sequence' }]
  const result = isPathInSequence(steps, '/not-in-sequence')
  t.equal(result, false, 'returns false if path is not in sequence')
  t.end()
})

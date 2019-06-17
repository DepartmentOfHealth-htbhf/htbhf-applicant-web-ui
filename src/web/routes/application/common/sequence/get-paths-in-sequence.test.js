const test = require('tape')
const { CHECK_URL, CONFIRM_URL } = require('../constants')
const { getPathsInSequence } = require('./get-paths-in-sequence')

test('getPathsInSequence() returns the correct sequence of paths', (t) => {
  const steps = [{ path: '/first', next: () => '/second' }, { path: '/second' }]
  const expected = ['/first', '/second', CHECK_URL, CONFIRM_URL]
  const result = getPathsInSequence(steps)

  t.deepEqual(result, expected, 'returns the correct sequence of paths')
  t.end()
})

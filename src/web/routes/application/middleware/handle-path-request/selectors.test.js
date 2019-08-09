const test = require('tape')
const { CHECK_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL } = require('../../common/constants')
const { getPathsInSequence } = require('./selectors')

const steps = [{ path: '/first', next: () => '/second' }, { path: '/second' }]

test('getPathsInSequence() returns the correct sequence of paths', (t) => {
  const expected = ['/first', '/second', CHECK_URL, TERMS_AND_CONDITIONS_URL, CONFIRM_URL]
  const result = getPathsInSequence(steps)

  t.deepEqual(result, expected, 'returns the correct sequence of paths')
  t.end()
})

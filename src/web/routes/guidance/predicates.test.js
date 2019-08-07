const test = require('tape')

const { isGuidancePageUrl } = require('./predicates')

test('isGuidancePageUrl() identifies a guidance page url', (t) => {
  t.deepEqual(isGuidancePageUrl('/what-you-get'), true, 'returns true for guidance url')
  t.deepEqual(isGuidancePageUrl('/buy'), true, 'returns true for guidance url')
  t.deepEqual(isGuidancePageUrl('/'), true, 'returns true for root url')
  t.deepEqual(isGuidancePageUrl('/blah'), false, 'returns false for any other url')
  t.end()
})

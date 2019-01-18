const test = require('tape')
const { NINO_PATTERN } = require('./validate')

test('invalid national insurance number does not match regex', (t) => {
  const invalidNino = 'invalid nino'
  const ninoFollowedByText = 'qq123456cTEST'
  const ninoPrefixByText = 'TESTqq123456c'
  const duplicateNino = 'qq123456cqq123456c'
  const emptyNino = ''

  const invalidMatches = invalidNino.match(NINO_PATTERN)
  const followedByTextMatches = ninoFollowedByText.match(NINO_PATTERN)
  const prefixByTextMatches = ninoPrefixByText.match(NINO_PATTERN)
  const duplicateNinoMatches = duplicateNino.match(NINO_PATTERN)
  const emptyNinoMatches = emptyNino.match(NINO_PATTERN)

  t.equal(invalidMatches, null)
  t.equal(followedByTextMatches, null)
  t.equal(prefixByTextMatches, null)
  t.equal(duplicateNinoMatches, null)
  t.equal(emptyNinoMatches, null)

  t.end()
})

test('valid national insurance number matches regex', (t) => {
  const validNino = 'qq123456c'

  const matches = validNino.match(NINO_PATTERN)

  t.deepEqual(matches[0], validNino)
  t.end()
})

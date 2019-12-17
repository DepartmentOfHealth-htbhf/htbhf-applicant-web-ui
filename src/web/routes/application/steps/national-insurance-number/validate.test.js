const test = require('tape')
const safeRegex = require('safe-regex')
const { NINO_PATTERN } = require('./validate')

test('invalid national insurance number does not match regex', (t) => {
  const invalidNino = 'invalid nino'
  const ninoFollowedByText = 'qq123456cTEST'
  const ninoPrefixByText = 'TESTqq123456c'
  const duplicateNino = 'qq123456cqq123456c'
  const emptyNino = ''
  const ninoStartingWithZZ = 'ZZ999999D'
  const ninoStartingWithQQ = 'QQ999999D'

  const invalidMatches = NINO_PATTERN.test(invalidNino)
  const followedByTextMatches = NINO_PATTERN.test(ninoFollowedByText)
  const prefixByTextMatches = NINO_PATTERN.test(ninoPrefixByText)
  const duplicateNinoMatches = NINO_PATTERN.test(duplicateNino)
  const emptyNinoMatches = NINO_PATTERN.test(emptyNino)
  const ninoStartingWithZZMatches = NINO_PATTERN.test(ninoStartingWithZZ)
  const ninoStartingWithQQMatches = NINO_PATTERN.test(ninoStartingWithQQ)

  t.equal(invalidMatches, false)
  t.equal(followedByTextMatches, false)
  t.equal(prefixByTextMatches, false)
  t.equal(duplicateNinoMatches, false)
  t.equal(emptyNinoMatches, false)
  t.equal(ninoStartingWithZZMatches, false)
  t.equal(ninoStartingWithQQMatches, false)

  t.end()
})

test('valid national insurance number matches regex', (t) => {
  const validNino = 'AA123456C'

  const matches = NINO_PATTERN.test(validNino)

  t.equal(matches, true)
  t.end()
})

test('nino regex is secure', (t) => {
  t.equal(safeRegex(NINO_PATTERN), true)
  t.end()
})

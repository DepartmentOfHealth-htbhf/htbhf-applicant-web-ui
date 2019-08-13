const test = require('tape')
const { toBooleanStrict } = require('./to-boolean-strict')

test('toBooleanStrict() returns correct values', (t) => {
  t.equal(toBooleanStrict('true'), true, 'coerces string “true” to boolean “true”')
  t.equal(toBooleanStrict(true), true, 'returns “true” for “true”')
  t.equal(toBooleanStrict('false'), false, 'coerces string “false” to boolean “false”')
  t.equal(toBooleanStrict(false), false, 'returns “false” for “false”')
  t.equal(toBooleanStrict(undefined), undefined, 'returns “undefined” for “undefined”')

  t.throws(() => toBooleanStrict(44), /Can’t coerce 44 to boolean/, 'throws error for integer')
  t.throws(() => toBooleanStrict('this is not a boolean string'), /Can’t coerce this is not a boolean string to boolean/, 'throws error for a string other than “true” or “false”')
  t.throws(() => toBooleanStrict(null), /Can’t coerce null to boolean/, 'throws error for null')

  t.end()
})

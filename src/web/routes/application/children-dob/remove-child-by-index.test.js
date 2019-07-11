const test = require('tape')
const { isKeyAfterRemoved } = require('./remove-child-by-index')

test('isKeyAfterRemoved()', (t) => {
  t.equal(isKeyAfterRemoved('childDob-1-day', 1), false)
  t.equal(isKeyAfterRemoved('childDob-1-day', 2), false)
  t.equal(isKeyAfterRemoved('childDob-1-day', 3), false)

  t.equal(isKeyAfterRemoved('childDob-2-day', 1), true)
  t.equal(isKeyAfterRemoved('childDob-2-day', 2), false)
  t.equal(isKeyAfterRemoved('childDob-2-day', 3), false)

  t.equal(isKeyAfterRemoved('childDob-3-day', 1), true)
  t.equal(isKeyAfterRemoved('childDob-3-day', 2), true)
  t.equal(isKeyAfterRemoved('childDob-3-day', 3), false)

  t.equal(isKeyAfterRemoved('childDob-11-day', 1), true)
  t.equal(isKeyAfterRemoved('childDob-1', 1), false)
  t.equal(isKeyAfterRemoved('childDob-5', 1), true)

  t.throws(() => isKeyAfterRemoved('childDob-day', 1), /Could not find index 1 for key childDob-day/)
  t.throws(() => isKeyAfterRemoved('inputCount', 1), /Could not find index 1 for key inputCount/)
  t.end()
})

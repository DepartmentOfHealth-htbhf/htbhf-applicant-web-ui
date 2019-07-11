const test = require('tape')
const { isKeyAfterRemoved, decrementKey } = require('./remove-child-by-index')

const children = {
  'childDob-1-day': '1',
  'childDob-1-month': '1',
  'childDob-1-year': '2001',
  'childDob-2-day': '2',
  'childDob-2-month': '2',
  'childDob-2-year': '2002',
  'childDob-3-day': '3',
  'childDob-3-month': '3',
  'childDob-3-year': '2003',
  'inputCount': 3
}

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

  t.throws(() => isKeyAfterRemoved('childDob-day', 1), /Could not find index for key childDob-day/)
  t.throws(() => isKeyAfterRemoved('inputCount', 1), /Could not find index for key inputCount/)
  t.end()
})

test('decrementKey()', (t) => {
  t.equal(decrementKey('childDob-2-day'), 'childDob-1-day')
  t.equal(decrementKey('childDob-11-day'), 'childDob-10-day')

  t.throws(() => decrementKey('childDob-day'), /Could not find index for key childDob-day/)
  t.throws(() => decrementKey('inputCount'), /Could not find index for key inputCount/)
  t.throws(() => decrementKey('childDob-1-day'), /Unable to decrement index for key childDob-1-day/)
  t.end()
})

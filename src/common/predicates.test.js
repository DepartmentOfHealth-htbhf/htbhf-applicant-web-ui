const test = require('tape')
const { isNilOrEmpty, isUndefined, isBoolean, isString, notIsUndefinedOrNullOrEmpty } = require('./predicates')

test('isNilOrEmpty', (t) => {
  t.equal(isNilOrEmpty(''), true, 'should be marked as empty')
  t.equal(isNilOrEmpty(null), true, 'should be marked as empty')
  t.equal(isNilOrEmpty(undefined), true, 'should be marked as empty')
  t.equal(isNilOrEmpty('Something'), false, 'should not be marked as empty')
  t.end()
})

test('isUndefined()', (t) => {
  t.equal(isUndefined(undefined), true)
  t.equal(isUndefined(null), false)
  t.equal(isUndefined(true), false)
  t.equal(isUndefined(false), false)
  t.equal(isUndefined(44), false)
  t.equal(isUndefined('a string'), false)
  t.end()
})

test('isBoolean()', (t) => {
  t.equal(isBoolean(undefined), false)
  t.equal(isBoolean(null), false)
  t.equal(isBoolean(true), true)
  t.equal(isBoolean(false), true)
  t.equal(isBoolean(44), false)
  t.equal(isBoolean('a string'), false)
  t.end()
})

test('isString()', (t) => {
  t.equal(isString(undefined), false)
  t.equal(isString(null), false)
  t.equal(isString(true), false)
  t.equal(isString(false), false)
  t.equal(isString(44), false)
  t.equal(isString('a string'), true)
  t.end()
})

test('notIsUndefinedOrNullOrEmpty()', (t) => {
  t.equal(notIsUndefinedOrNullOrEmpty(undefined), false)
  t.equal(notIsUndefinedOrNullOrEmpty(null), false)
  t.equal(notIsUndefinedOrNullOrEmpty([]), false)
  t.equal(notIsUndefinedOrNullOrEmpty(''), false)
  t.equal(notIsUndefinedOrNullOrEmpty('Address'), true)
  t.equal(notIsUndefinedOrNullOrEmpty(['Item 1', 'Item 2']), true)
  t.end()
})

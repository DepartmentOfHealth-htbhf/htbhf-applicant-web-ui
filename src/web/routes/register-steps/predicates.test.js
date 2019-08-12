const test = require('tape')
const { isUndefined, isBoolean, isString } = require('./predicates')

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

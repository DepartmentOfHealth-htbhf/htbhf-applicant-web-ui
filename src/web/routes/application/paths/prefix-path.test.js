const test = require('tape')
const { prefixPath } = require('./prefix-path')

test('prefixPath() does not prefix path if no prefix defined', (t) => {
  t.equal(prefixPath(undefined, '/first'), '/first', 'does not prefix path if no prefix defined')
  t.end()
})

test('prefixPath() adds prefix to path', (t) => {
  t.equal(prefixPath('/my-journey', '/first'), '/my-journey/first', 'adds prefix to path')
  t.end()
})

test('prefixPath() throws an error if segment does not start with "/"', (t) => {
  const prefixResult = () => prefixPath('my-journey', '/first')
  const pathResult = () => prefixPath('/my-journey', 'first')
  t.throws(prefixResult, /Invalid prefix "my-journey". Prefix must be a string starting with "\/"/, 'throws an error if prefix does not start with "/"')
  t.throws(pathResult, /Invalid path "first". Path must be a string starting with "\/"/, 'throws an error if path does not start with "/"')
  t.end()
})

test('prefixPath() throws an error if segment is not a string', (t) => {
  const prefixResult = () => prefixPath(true, '/first')
  const pathResult = () => prefixPath('/my-journey', true)
  t.throws(prefixResult, /Invalid prefix "true". Prefix must be a string starting with "\/"/, 'throws an error if prefix is not a string')
  t.throws(pathResult, /Invalid path "true". Path must be a string starting with "\/"/, 'throws an error if path is not a string')
  t.end()
})

test('prefixPath() throws an error if path is undefined', (t) => {
  const result = () => prefixPath('/my-journey', undefined)
  t.throws(result, /Invalid path "undefined". Path must be a string starting with "\/"/, 'throws an error if path is undefined')
  t.end()
})

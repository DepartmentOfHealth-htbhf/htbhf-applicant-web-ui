const test = require('tape')
const { toDateString } = require('./validate')

test('toDateString() should concatenate digits with hyphens', (t) => {
  const result = toDateString('31', '13', '1980')
  const expected = '1980-13-31'

  t.equal(result, expected, 'should concatenate digits with hyphens')
  t.end()
})

test('toDateString() should pad day and month', (t) => {
  const result = toDateString('1', '3', '1980')
  const expected = '1980-03-01'

  t.equal(result, expected, 'should pad day and month')
  t.end()
})

test('toDateString() should coerce all arguments to strings', (t) => {
  const result = toDateString(undefined, null, 22)
  const expected = '22-00-00'

  t.equal(result, expected, 'should coerce all arguments to strings')
  t.end()
})

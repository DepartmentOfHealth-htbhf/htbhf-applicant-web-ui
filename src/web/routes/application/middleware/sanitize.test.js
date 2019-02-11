const test = require('tape')
const { trimValues, escapeValues } = require('./sanitize')

test('trimValues', (t) => {
  const body = {
    lastName: '    whitespace     '
  }
  const expected = {
    lastName: 'whitespace'
  }
  const result = trimValues(body)

  t.deepEqual(result, expected, 'it should remove trailing white space')
  t.end()
})

test('escapeValues', (t) => {
  const body = {
    firstName: '<script>window.alert(\'Boo\')</script>'
  }
  const expected = {
    firstName: '&lt;script&gt;window.alert(&#39;Boo&#39;)&lt;/script&gt;'
  }
  const result = escapeValues(body)
  t.deepEqual(result, expected, 'characters should be escaped')
  t.end()
})

test('does not escape spaces', (t) => {
  const body = {
    addressLine1: 'Flat B'
  }
  const expected = {
    addressLine1: 'Flat B'
  }
  const result = escapeValues(body)
  t.deepEqual(result, expected, 'spaces should not be escaped')
  t.end()
})

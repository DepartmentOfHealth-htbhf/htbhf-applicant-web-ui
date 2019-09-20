const test = require('tape')
const { toTitleCase, SINGLE_WORD_REGEX } = require('./formats')
const safeRegex = require('safe-regex')

test('toTitleCase() should uppercase the first letter of every word', (t) => {
  const result = toTitleCase('10A, MY STREET, WESTON-SUPER-MARE')

  const expected = '10a, My Street, Weston-Super-Mare'

  t.equals(result, expected, 'transforms string to title case correctly')
  t.end()
})

test('single word regex is safe()', (t) => {
  t.equal(safeRegex(SINGLE_WORD_REGEX), true)
  t.end()
})

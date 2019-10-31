const test = require('tape')
const { countKeysContainingString } = require('./count-keys')

test('countKeysContainingString() returns the correct count of entries', (t) => {
  const fields = {
    'day-01': '1',
    'month-01': '1',
    'year-01': '2001',
    'day-02': '2',
    'month-02': '2',
    'year-02': '2001',
    'day-03': '3',
    'month-03': '3',
    'year-03': '2001'
  }

  const result = countKeysContainingString('day', fields)
  t.equal(result, 3, 'returns the correct count of day entries')
  t.end()
})

test('countKeysContainingString() returns 0 if no entries match string', (t) => {
  const fields = {
    'day-01': '1',
    'month-01': '1',
    'year-01': '2001',
    'day-02': '2',
    'month-02': '2',
    'year-02': '2001',
    'day-03': '3',
    'month-03': '3',
    'year-03': '2001'
  }

  const result = countKeysContainingString('not-day', fields)
  t.equal(result, 0, 'returns 0 if no entries match string')
  t.end()
})

const test = require('tape')
const { partitionObj } = require('./partition-obj')

const isGood = (val, key) => key.startsWith('good')

const isEven = (val, key) => val % 2 === 0

test('partitionObj() returns two objects based on predicate acting on key', (t) => {
  const obj = {
    'good-one': 'Fudge',
    'good-two': 'Denim',
    'bad-one': 'Rollerblading',
    'bad-two': 'Red Leicester',
    'good-three': 'Deep Impact',
    'bad-three': 'Armageddon'
  }

  const expected = {
    matches: {
      'good-one': 'Fudge',
      'good-two': 'Denim',
      'good-three': 'Deep Impact'
    },
    others: {
      'bad-one': 'Rollerblading',
      'bad-two': 'Red Leicester',
      'bad-three': 'Armageddon'
    }
  }

  const result = partitionObj(isGood, obj)
  t.deepEqual(result, expected, 'returns two objects based on predicate acting on key')
  t.end()
})

test('partitionObj() returns two objects based on predicate acting on value', (t) => {
  const obj = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5
  }

  const expected = {
    matches: {
      'two': 2,
      'four': 4
    },
    others: {
      'one': 1,
      'three': 3,
      'five': 5
    }
  }

  const result = partitionObj(isEven, obj)
  t.deepEqual(result, expected, 'returns two objects based on predicate acting on value')
  t.end()
})

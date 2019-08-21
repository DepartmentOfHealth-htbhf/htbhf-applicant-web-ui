const test = require('tape')
const { removeChildByIndex } = require('./remove-child-by-index')

test('removeChildByIndex', (t) => {
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

  const expected = {
    'childDob-1-day': '1',
    'childDob-1-month': '1',
    'childDob-1-year': '2001',
    'childDob-2-day': '3',
    'childDob-2-month': '3',
    'childDob-2-year': '2003',
    'inputCount': 3
  }

  t.deepEqual(removeChildByIndex(children, 2), expected)
  t.end()
})

const test = require('tape')
const { getChildrensDatesOfBirthRows } = require('./get-childrens-dates-of-birth-rows')
const { NAME_KEY, DATE_OF_BIRTH_KEY } = require('./constants')

test('getChildrensDatesOfBirthRows() builds rows in correct format', (t) => {
  const children = {
    'childDobName-1': 'Lisa',
    'childDob-1-day': '14',
    'childDob-1-month': '11',
    'childDob-1-year': '1990',
    'childDobName-2': 'Bart',
    'childDob-2-day': '2',
    'childDob-2-month': '3',
    'childDob-2-year': '1999',
    'childCount': 2
  }

  const expected = [
    {
      key: { text: NAME_KEY },
      value: { text: 'Lisa' }
    },
    {
      key: { text: DATE_OF_BIRTH_KEY },
      value: { text: '14 November 1990' }
    },
    {
      key: { text: NAME_KEY },
      value: { text: 'Bart' } },
    {
      key: { text: DATE_OF_BIRTH_KEY },
      value: { text: '2 March 1999' }
    }
  ]

  const result = getChildrensDatesOfBirthRows(children)

  t.deepEqual(result, expected, 'builds rows in correct format')
  t.end()
})

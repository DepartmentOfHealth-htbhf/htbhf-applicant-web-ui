const test = require('tape')
const { getChildrensDatesOfBirthRows } = require('./get-childrens-dates-of-birth-rows')

test('getChildrensDatesOfBirthRows() builds rows in correct format', (t) => {
  const localisation = {
    name: 'Name',
    dateOfBirth: 'Date of birth'
  }

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
      key: { text: 'Name' },
      value: { text: 'Lisa' }
    },
    {
      key: { text: 'Date of birth' },
      value: { text: '14 November 1990' }
    },
    {
      key: { text: 'Name' },
      value: { text: 'Bart' } },
    {
      key: { text: 'Date of birth' },
      value: { text: '2 March 1999' }
    }
  ]

  const result = getChildrensDatesOfBirthRows(localisation)(children)

  t.deepEqual(result, expected, 'builds rows in correct format')
  t.end()
})

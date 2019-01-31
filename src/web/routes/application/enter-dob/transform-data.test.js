const test = require('tape')
const { transformData } = require('./transform-data')

test('transformData() should format and return dateOfBirth', (t) => {
  const req = { body: {
    'dateOfBirth-day': '21',
    'dateOfBirth-month': '1',
    'dateOfBirth-year': 2000 }
  }
  const expectedData = { dateOfBirth: '2000-01-21' }

  const data = transformData(req)

  t.deepEqual(data, expectedData, 'should return dateOfBirth')
  t.end()
})

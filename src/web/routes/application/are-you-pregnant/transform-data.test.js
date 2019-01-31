const test = require('tape')
const { transformData } = require('./transform-data')

test('transformData() should format and return expectedDueDate when areYouPregnant is yes', (t) => {
  const req = { body: { areYouPregnant: 'yes',
    'expectedDeliveryDate-day': '21',
    'expectedDeliveryDate-month': '1',
    'expectedDeliveryDate-year': 2000 }
  }
  const expectedData = { areYouPregnant: 'yes', expectedDeliveryDate: '2000-01-21' }

  const data = transformData(req)

  t.deepEqual(data, expectedData, 'should return areYouPregnant and expectedDeliveryDate')
  t.end()
})

test('transformData() should set expectedDueDate to null when areYouPregnant is no', (t) => {
  const req = { body: { areYouPregnant: 'no',
    'expectedDeliveryDate-day': '21',
    'expectedDeliveryDate-month': '1',
    'expectedDeliveryDate-year': 2000 },
  session: {} }
  const expectedData = { areYouPregnant: 'no', expectedDeliveryDate: null }

  const data = transformData(req)

  t.deepEqual(data, expectedData, 'should return areYouPregnant and null expectedDeliveryDate')
  t.end()
})

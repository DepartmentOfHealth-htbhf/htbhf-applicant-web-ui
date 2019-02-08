const test = require('tape')
const { exampleDate, contentSummary } = require('./are-you-pregnant')

test('exampleDate() should return a date of 28th, five months after the provided date', (t) => {
  const initialDate = new Date(2018, 0, 1)
  const expected = '28 6 2018'

  t.equal(exampleDate(initialDate), expected, 'should return 28th 5 months into the future')
  t.end()
})

test('exampleDate() should correctly roll into the next year', (t) => {
  const initialDate = new Date(2018, 10, 30)
  const expected = '28 4 2019'

  t.equal(exampleDate(initialDate), expected, 'should return 28 4 2019')
  t.end()
})

test('Are you pregnant contentSummary() should return content summary in correct format when not pregnant', (t) => {
  const req = {
    t: string => string === 'no' ? 'No' : string,
    session: {
      claim: {
        otherValue: 'something',
        areYouPregnant: 'no'
      }
    }
  }

  const result = contentSummary(req)

  const expected = {
    key: 'areYouPregnant.summaryKey',
    value: 'No'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

test('Are you pregnant contentSummary() should return content summary in correct format when pregnant', (t) => {
  const req = {
    t: string => string,
    session: {
      claim: {
        otherValue: 'something',
        areYouPregnant: 'yes',
        'expectedDeliveryDate-day': '01',
        'expectedDeliveryDate-month': '03',
        'expectedDeliveryDate-year': '2019'
      }
    }
  }

  const result = contentSummary(req)

  const expected = [{
    key: 'areYouPregnant.summaryKey',
    value: 'yes'
  }, {
    key: 'areYouPregnant.expectedDeliveryDateSummaryKey',
    value: '1 March 2019'
  }]

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

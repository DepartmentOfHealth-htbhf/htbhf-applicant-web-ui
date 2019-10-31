const test = require('tape')
const { contentSummary } = require('./are-you-pregnant')

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

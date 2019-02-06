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

test('Are you pregnant contentSummary() should return content summary in correct format', (t) => {
  const req = {
    t: string => string,
    session: {
      claim: {
        otherValue: 'something',
        areYouPregnant: 'yes'
      }
    }
  }

  const result = contentSummary(req)

  const expected = {
    key: 'areYouPregnant.summaryKey',
    value: 'yes'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

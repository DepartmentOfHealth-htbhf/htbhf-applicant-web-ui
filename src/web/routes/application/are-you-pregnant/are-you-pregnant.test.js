const test = require('tape')
const { exampleDate } = require('./are-you-pregnant')

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

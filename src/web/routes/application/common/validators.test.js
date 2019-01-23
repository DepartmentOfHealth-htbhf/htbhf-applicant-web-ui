const test = require('tape')
const { isValidDate, isDateInPast } = require('./validators')

test('isValidDate', (t) => {
  t.equal(isValidDate('1999-12-12'), true, '"1999-12-12" should be a valid date')
  t.equal(isValidDate('1900-01-01'), true, '"1900-01-01" should be a valid date')
  t.equal(isValidDate('2999-12-31'), true, '"2999-12-31" should be a valid date')

  t.equal(isValidDate(null), false, 'null should not be a valid date')
  t.equal(isValidDate('2009-02-29'), false, '"2009-02-29" should not be a valid date')
  t.equal(isValidDate('abcd-ab-ab'), false, '"abcd-ab-ab" should not be a valid date')
  t.equal(isValidDate('2007-04-05T14:30'), false, '"2007-04-05T14:30" should not be a valid date')
  t.end()
})

test('isDateInPast', (t) => {
  const today = new Date()
  const yyyy = today.getFullYear() + 1

  const nextYear = yyyy + '-01-01'

  t.equal(isDateInPast('1999-12-12'), true, '"1999-12-12" is a date in the past')
  t.equal(isDateInPast(nextYear), false, `"${nextYear}" is a date in the future`)
  t.equal(isDateInPast(null), true, 'null should not be validated')
  t.end()
})

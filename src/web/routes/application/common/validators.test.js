const test = require('tape')
const { isValidDate, isDateInPast, isDateMoreThanOneMonthAgo, isDateMoreThanEightMonthsInTheFuture, dateAsString } = require('./validators')

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

test('isDateMoreThanOneMonthAgo', (t) => {
  const oneMonthAgo = dateAsString({ monthAdjustment: -1 })

  t.equal(isDateMoreThanOneMonthAgo('1999-12-12'), true, '"1999-12-12" is more than one month ago')
  t.equal(isDateMoreThanOneMonthAgo('9999-12-12'), false, '"9999-12-12" is not more than one month ago')
  t.equal(isDateMoreThanOneMonthAgo(oneMonthAgo), false, `"${oneMonthAgo}" is exactly one month ago`)
  t.equal(isDateMoreThanOneMonthAgo(''), true, 'blank string should not be validated')
  t.equal(isDateMoreThanOneMonthAgo(null), true, 'null string should not be validated')
  t.equal(isDateMoreThanOneMonthAgo('12-12-1999'), true, 'invalid format string "12-12-1999" should not be validated')
  t.end()
})

test('isDateMoreThanEightMonthsInTheFuture', (t) => {
  const eightMonthsInFuture = dateAsString({ monthAdjustment: -8 })

  t.equal(isDateMoreThanEightMonthsInTheFuture('1999-12-12'), false, '"1999-12-12" is not more than eight months in the future')
  t.equal(isDateMoreThanEightMonthsInTheFuture('9999-12-12'), true, '"9999-12-12" is more than eight months in the future')
  t.equal(isDateMoreThanEightMonthsInTheFuture(eightMonthsInFuture), false, `"${eightMonthsInFuture}" is exactly eight months in the future`)
  t.equal(isDateMoreThanEightMonthsInTheFuture(''), true, 'blank string should not be validated')
  t.equal(isDateMoreThanEightMonthsInTheFuture(null), true, 'null string should not be validated')
  t.equal(isDateMoreThanEightMonthsInTheFuture('12-12-1999'), true, 'invalid format string "12-12-1999" should not be validated')
  t.end()
})

test('dateAsString', (t) => {
  const DECEMBER = 11
  const date = new Date(1999, DECEMBER, 31)

  t.equal(dateAsString({ date: date, monthAdjustment: 8 }), '2000-08-31', '8 months from 1999-12-31 should be 2000-08-31')
  t.equal(dateAsString({ date: date }), '1999-12-31', '1999-12-31 is not formatted correctly')
  t.equal(dateAsString({ date: date, monthAdjustment: -2 }), '1999-10-31', '2 months from 1999-12-31 should ne 1999-10-31')
  t.throws(dateAsString.bind(null, { monthAdjustment: 'foo' }), /Month adjustment must be numeric/, 'not a valid month adjustment value')
  t.end()
})

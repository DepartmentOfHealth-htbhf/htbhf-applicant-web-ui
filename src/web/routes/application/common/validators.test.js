const test = require('tape')
const { dateAsString } = require('./formatters')
const {
  isValidDate,
  isDateInPast,
  isDateMoreThanOneMonthAgo,
  isDateMoreThanEightMonthsInTheFuture,
  isDateMoreThanFourYearsAgo
} = require('./validators')

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

test('isDateMoreThanFourYearsAgo', (t) => {
  const fourYearsAgo = dateAsString({ yearAdjustment: -4 })

  t.equal(isDateMoreThanFourYearsAgo('9999-12-12'), false, '"9999-12-12" is not more than four years ago')
  t.equal(isDateMoreThanFourYearsAgo('1900-12-12'), true, '"1900-12-12" is more than four years ago')
  t.equal(isDateMoreThanFourYearsAgo(fourYearsAgo), false, `"${fourYearsAgo}" is exactly four years ago`)
  t.equal(isDateMoreThanFourYearsAgo(''), true, 'blank string should not be validated')
  t.equal(isDateMoreThanFourYearsAgo(null), true, 'null string should not be validated')
  t.equal(isDateMoreThanFourYearsAgo('12-12-1999'), true, 'invalid format string "12-12-1999" should not be validated')
  t.end()
})

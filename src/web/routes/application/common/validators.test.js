const test = require('tape')
const { isValidDate, isDateInPast, isDateMoreThanOneMonthAgo, isDateMoreThanEightMonthsInTheFuture } = require('./validators')
const { toDateString } = require('./formatters')

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
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

  const dd = oneMonthAgo.getDate()
  const mm = oneMonthAgo.getMonth() + 1
  const yyyy = oneMonthAgo.getFullYear()
  const oneMonthAgoString = toDateString(dd, mm, yyyy)

  t.equal(isDateMoreThanOneMonthAgo('1999-12-12'), true, '"1999-12-12" is more than one month ago')
  t.equal(isDateMoreThanOneMonthAgo('9999-12-12'), false, '"9999-12-12" is not more than one month ago')
  t.equal(isDateMoreThanOneMonthAgo(oneMonthAgoString), false, `"${oneMonthAgoString}" is exactly one month ago`)
  t.equal(isDateMoreThanOneMonthAgo(''), true, 'blank string should not be validated')
  t.equal(isDateMoreThanOneMonthAgo(null), true, 'null string should not be validated')
  t.equal(isDateMoreThanOneMonthAgo('12-12-1999'), true, 'invalid format string "12-12-1999" should not be validated')
  t.end()
})

test('isDateMoreThanEightMonthsInTheFuture', (t) => {
  const eightMonthsInFuture = new Date()
  eightMonthsInFuture.setMonth(eightMonthsInFuture.getMonth() + 8)

  const dd = eightMonthsInFuture.getDate()
  const mm = eightMonthsInFuture.getMonth() + 1
  const yyyy = eightMonthsInFuture.getFullYear()
  const eightMonthsInFutureString = toDateString(dd, mm, yyyy)

  t.equal(isDateMoreThanEightMonthsInTheFuture('1999-12-12'), false, '"1999-12-12" is not more than eight months in the future')
  t.equal(isDateMoreThanEightMonthsInTheFuture('9999-12-12'), true, '"9999-12-12" is more than eight months in the future')
  t.equal(isDateMoreThanEightMonthsInTheFuture(eightMonthsInFutureString), false, `"${eightMonthsInFutureString}" is exactly eight months in the future`)
  t.equal(isDateMoreThanEightMonthsInTheFuture(''), true, 'blank string should not be validated')
  t.equal(isDateMoreThanEightMonthsInTheFuture(null), true, 'null string should not be validated')
  t.equal(isDateMoreThanEightMonthsInTheFuture('12-12-1999'), true, 'invalid format string "12-12-1999" should not be validated')
  t.end()
})

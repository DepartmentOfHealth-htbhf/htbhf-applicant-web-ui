const test = require('tape')
const { validateExpectedDeliveryDate } = require('./validate')
const { toDateString } = require('../common/formatters')
const { YES, NO } = require('./constants')

test('validateExpectedDeliveryDate()', (t) => {
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: YES
    }
  }

  const eightMonthsInFuture = new Date()
  eightMonthsInFuture.setMonth(eightMonthsInFuture.getMonth() + 8)
  const eightMonthsInFutureString = formatDate(eightMonthsInFuture)

  const oneMonthInPast = new Date()
  oneMonthInPast.setMonth(oneMonthInPast.getMonth() - 1)
  const oneMonthInPastString = formatDate(oneMonthInPast)

  t.equal(validateExpectedDeliveryDate(oneMonthInPastString, { req }), true, 'should return true for exactly one month in past')
  t.equal(validateExpectedDeliveryDate(eightMonthsInFutureString, { req }), true, 'should return true for exactly eight months in future')
  t.throws(validateExpectedDeliveryDate.bind(null, '1980-03-31', { req }), /validation:expectedDeliveryDateInvalidTooFarInPast/, 'not in valid date range')
  t.throws(validateExpectedDeliveryDate.bind(null, '9999-03-31', { req }), /validation:expectedDeliveryDateInvalidTooFarInFuture/, 'not in valid date range')
  t.throws(validateExpectedDeliveryDate.bind(null, null, { req }), /validation:expectedDeliveryDateInvalid/, 'should throw an error for a null date')
  t.throws(validateExpectedDeliveryDate.bind(null, 'invalid', { req }), /validation:expectedDeliveryDateInvalid/, 'should throw an error for "invalid"')
  t.end()
})

test('validateExpectedDeliveryDateNotPregnant()', (t) => {
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: NO
    }
  }

  t.equal(validateExpectedDeliveryDate('', { req }), true, 'should not validate the date if not pregnant')
  t.end()
})

function formatDate (dateToFormat) {
  const dd = dateToFormat.getDate()
  const mm = dateToFormat.getMonth() + 1
  const yyyy = dateToFormat.getFullYear()
  return toDateString(dd, mm, yyyy)
}

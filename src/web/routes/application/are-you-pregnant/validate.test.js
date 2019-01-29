const test = require('tape')
const { validateExpectedDeliveryDate } = require('./validate')
const { dateAsString } = require('../common/validators')
const { YES, NO } = require('./constants')

test('validateExpectedDeliveryDate()', (t) => {
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: YES
    }
  }

  const eightMonthsInFuture = dateAsString({ monthAdjustment: 8 })

  const oneMonthInPast = dateAsString({ monthAdjustment: -1 })

  t.equal(validateExpectedDeliveryDate(oneMonthInPast, { req }), true, 'should return true for exactly one month in past')
  t.equal(validateExpectedDeliveryDate(eightMonthsInFuture, { req }), true, 'should return true for exactly eight months in future')
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

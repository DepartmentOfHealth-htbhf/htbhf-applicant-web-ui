const test = require('tape')
const { validateExpectedDeliveryDate } = require('../validate')
const { YES, NO } = require('../constants')

test('validateExpectedDeliveryDate() eight months in the future', (t) => {
  const eightMonthsInFuture = createDateWithMonthAdjustment(8)
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: YES,
      'expectedDeliveryDate-day': eightMonthsInFuture.getDate(),
      'expectedDeliveryDate-month': eightMonthsInFuture.getMonth() + 1,
      'expectedDeliveryDate-year': eightMonthsInFuture.getFullYear()
    }
  }

  t.equal(validateExpectedDeliveryDate({}, { req }), true, 'should return true for exactly eight months in future')
  t.end()
})

test('validateExpectedDeliveryDate() one month in the past', (t) => {
  const oneMonthInPast = createDateWithMonthAdjustment(-1)
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: YES,
      'expectedDeliveryDate-day': oneMonthInPast.getDate(),
      'expectedDeliveryDate-month': oneMonthInPast.getMonth() + 1,
      'expectedDeliveryDate-year': oneMonthInPast.getFullYear()
    }
  }

  t.equal(validateExpectedDeliveryDate({}, { req }), true, 'should return true for exactly one month in past')
  t.end()
})

test('validateExpectedDeliveryDate() date too far in the past', (t) => {
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: YES,
      'expectedDeliveryDate-day': 31,
      'expectedDeliveryDate-month': 3,
      'expectedDeliveryDate-year': 1980
    }
  }

  t.throws(validateExpectedDeliveryDate.bind(null, {}, { req }), /validation:expectedDeliveryDateInvalidTooFarInPast/, 'not in valid date range')
  t.end()
})

test('validateExpectedDeliveryDate() too far in the future', (t) => {
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: YES,
      'expectedDeliveryDate-day': 31,
      'expectedDeliveryDate-month': 3,
      'expectedDeliveryDate-year': 9999
    }
  }

  t.throws(validateExpectedDeliveryDate.bind(null, {}, { req }), /validation:expectedDeliveryDateInvalidTooFarInFuture/, 'not in valid date range')
  t.end()
})

test('validateExpectedDeliveryDate() null date', (t) => {
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: YES,
      'expectedDeliveryDate-day': null,
      'expectedDeliveryDate-month': null,
      'expectedDeliveryDate-year': null
    }
  }

  t.throws(validateExpectedDeliveryDate.bind(null, {}, { req }), /validation:expectedDeliveryDateInvalid/, 'not in valid date range')
  t.end()
})

test('validateExpectedDeliveryDate() invalid date', (t) => {
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: YES,
      'expectedDeliveryDate-day': 'invalid',
      'expectedDeliveryDate-month': 'invalid',
      'expectedDeliveryDate-year': 'invalid'
    }
  }

  t.throws(validateExpectedDeliveryDate.bind(null, {}, { req }), /validation:expectedDeliveryDateInvalid/, 'not in valid date range')
  t.end()
})

test('validateExpectedDeliveryDateNotPregnant()', (t) => {
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: NO
    }
  }

  t.equal(validateExpectedDeliveryDate({}, { req }), true, 'should not validate the date if not pregnant')
  t.end()
})

const createDateWithMonthAdjustment = (monthAdjustment) => {
  const date = new Date()
  date.setMonth(date.getMonth() + monthAdjustment)
  return date
}

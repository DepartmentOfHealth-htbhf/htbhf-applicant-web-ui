const test = require('tape')
const { validateExpectedDeliveryDate } = require('../validate')
const { YES, NO } = require('../constants')

const res = {
  locals: {}
}

const createDateWithMonthAdjustment = (monthAdjustment) => {
  const date = new Date()
  date.setMonth(date.getMonth() + monthAdjustment)
  return date
}

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

  const result = validateExpectedDeliveryDate(res)({}, { req })

  t.equal(result, true, 'should return true for exactly eight months in future')
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

  const result = validateExpectedDeliveryDate(res)({}, { req })

  t.equal(result, true, 'should return true for exactly one month in past')
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

  const result = validateExpectedDeliveryDate(res).bind(null, {}, { req })

  t.throws(result, /validation:expectedDeliveryDateTooFarInPast/, 'not in valid date range')
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

  const result = validateExpectedDeliveryDate(res).bind(null, {}, { req })

  t.throws(result, /validation:expectedDeliveryDateTooFarInFuture/, 'not in valid date range')
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

  const result = validateExpectedDeliveryDate(res).bind(null, {}, { req })

  t.throws(result, /validation:expectedDeliveryDateInvalid/, 'not in valid date range')
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

  const result = validateExpectedDeliveryDate(res).bind(null, {}, { req })

  t.throws(result, /validation:expectedDeliveryDateInvalid/, 'not in valid date range')
  t.end()
})

test('validateExpectedDeliveryDateNotPregnant()', (t) => {
  const req = {
    t: (string) => string,
    body: {
      areYouPregnant: NO
    }
  }

  const result = validateExpectedDeliveryDate(res)({}, { req })

  t.equal(result, true, 'should not validate the date if not pregnant')
  t.end()
})

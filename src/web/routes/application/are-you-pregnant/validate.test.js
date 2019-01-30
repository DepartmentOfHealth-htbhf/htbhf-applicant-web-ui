const test = require('tape')
const { applyExpressValidation } = require('../common/test/apply-express-validation')
const { validate, addExpectedDeliveryDateToBody, validateExpectedDeliveryDate } = require('./validate')
const { dateAsString } = require('../common/formatters')
const { YES, NO } = require('./constants')

const res = {}
const next = () => {}

test('validation middleware passes with valid body', async (t) => {
  const sixMonthsInFuture = dateAsString({ monthAdjustment: 6 }).split('-')

  const req = {
    t: string => string,
    body: {
      areYouPregnant: YES,
      'expectedDeliveryDate-day': sixMonthsInFuture[2],
      'expectedDeliveryDate-month': sixMonthsInFuture[1],
      'expectedDeliveryDate-year': sixMonthsInFuture[0]
    }
  }

  const result = await applyExpressValidation(req, validate)
  t.equal(result.isEmpty(), true)
  t.end()
})

test('validation middleware errors for are you pregnant field', async (t) => {
  const sixMonthsInFuture = dateAsString({ monthAdjustment: 6 }).split('-')

  const req = {
    t: string => string,
    body: {
      areYouPregnant: 'maybe',
      'expectedDeliveryDate-day': sixMonthsInFuture[2],
      'expectedDeliveryDate-month': sixMonthsInFuture[1],
      'expectedDeliveryDate-year': sixMonthsInFuture[0]
    }
  }

  const result = await applyExpressValidation(req, validate)
  const error = result.array()[0]
  t.equal(result.isEmpty(), false, 'should have errors')
  t.equal(error.param, 'areYouPregnant', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:selectYesOrNo', 'error should have correct message')
  t.end()
})

test('validation middleware errors for are you pregnant field', async (t) => {
  const twelveMonthsInFuture = dateAsString({ monthAdjustment: 12 }).split('-')

  const req = {
    t: string => string,
    body: {
      areYouPregnant: YES,
      'expectedDeliveryDate-day': twelveMonthsInFuture[2],
      'expectedDeliveryDate-month': twelveMonthsInFuture[1],
      'expectedDeliveryDate-year': twelveMonthsInFuture[0]
    }
  }

  const result = await applyExpressValidation(req, validate)
  const error = result.array()[0]
  t.equal(result.isEmpty(), false, 'should have errors')
  t.equal(error.param, 'expectedDeliveryDate', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:expectedDeliveryDateInvalidTooFarInFuture', 'error should have correct message')
  t.end()
})

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

test('addExpectedDeliveryDateToBody() should not add key to body if areYouPregnant is undefined', (t) => {
  const req = { body: {} }

  addExpectedDeliveryDateToBody(req, res, next)
  t.equal(typeof req.body.expectedDeliveryDate, 'undefined', 'should not add key to body if areYouPregnant is undefined')
  t.end()
})

test(`addExpectedDeliveryDateToBody() should not add key to body if areYouPregnant is ${NO}`, (t) => {
  const req = {
    body: {
      areYouPregnant: NO
    }
  }

  addExpectedDeliveryDateToBody(req, res, next)
  t.equal(typeof req.body.expectedDeliveryDate, 'undefined', `should not add key to body if areYouPregnant is ${NO}`)
  t.end()
})

test(`addExpectedDeliveryDateToBody() should add key to body if areYouPregnant is ${YES}`, (t) => {
  const req = {
    body: {
      areYouPregnant: YES,
      'expectedDeliveryDate-day': '02',
      'expectedDeliveryDate-month': '02',
      'expectedDeliveryDate-year': '2222'
    }
  }

  addExpectedDeliveryDateToBody(req, res, next)
  t.equal(req.body.expectedDeliveryDate, '2222-02-02', `should add key to body if areYouPregnant is ${YES}`)
  t.end()
})

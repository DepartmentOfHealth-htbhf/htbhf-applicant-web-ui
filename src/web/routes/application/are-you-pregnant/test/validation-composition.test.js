const test = require('tape')
const { assocPath } = require('ramda')
const { applyExpressValidation } = require('../../common/test/apply-express-validation')
const { dateAsString } = require('../../common/formatters')
const { validate } = require('../validate')
const { YES } = require('../constants')

const translate = string => string
const sixMonthsInFuture = dateAsString({ monthAdjustment: 6 }).split('-')
const req = {
  t: translate,
  body: {
    areYouPregnant: YES,
    'expectedDeliveryDate-day': sixMonthsInFuture[2],
    'expectedDeliveryDate-month': sixMonthsInFuture[1],
    'expectedDeliveryDate-year': sixMonthsInFuture[0]
  }
}

test('validation middleware passes with valid body', async (t) => {
  const testReq = { ...req }

  const result = await applyExpressValidation(testReq, validate)
  t.equal(result.isEmpty(), true)
  t.end()
})

test('validation middleware errors for are you pregnant field', async (t) => {
  const testReq = assocPath(['body', 'areYouPregnant'], 'maybe', req)

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'areYouPregnant', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:selectYesOrNo', 'error should have correct message')
  t.end()
})

test('validation middleware errors for expected delivery date field', async (t) => {
  const twelveMonthsInFuture = dateAsString({ monthAdjustment: 12 }).split('-')

  const testReq = {
    ...req,
    body: {
      areYouPregnant: YES,
      'expectedDeliveryDate-day': twelveMonthsInFuture[2],
      'expectedDeliveryDate-month': twelveMonthsInFuture[1],
      'expectedDeliveryDate-year': twelveMonthsInFuture[0]
    }
  }

  const result = await applyExpressValidation(testReq, validate)
  const error = result.array()[0]
  t.equal(result.array().length, 1, 'should have exactly one error')
  t.equal(error.param, 'expectedDeliveryDate', 'error should be associated with correct field')
  t.equal(error.msg, 'validation:expectedDeliveryDateTooFarInFuture', 'error should have correct message')
  t.end()
})

const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { ELIGIBLE } = require('./common/constants')

const wrapError = sinon.spy()

const { toPounds, isNilOrLessThanZero, getConfirmPage } = proxyquire('./confirm', {
  './common/formatters': { wrapError }
})

test('toPounds() converts value in pence to pounds', (t) => {
  const expected = '3.10'
  const result = toPounds(310)
  t.equal(result, expected, 'gets voucher value in pence and converts to pounds')
  t.end()
})

test('isNilOrLessThanZero()', (t) => {
  t.equal(isNilOrLessThanZero(-3), true, 'returns true for an integer less than zero')
  t.equal(isNilOrLessThanZero(null), true, 'returns true for null')
  t.end()
})

test(`getConfirmPage() calls render with confirm template when status is ${ELIGIBLE}`, (t) => {
  const render = sinon.spy()

  const req = {
    t: () => {},
    session: {
      eligibilityStatus: ELIGIBLE,
      voucherEntitlement: {
        totalVoucherValueInPence: 310
      }
    }
  }

  const res = {
    render
  }

  getConfirmPage(req, res)

  t.equal(render.calledWith('confirm'), true, 'calls render with confirm template')
  t.end()
})

test(`getConfirmPage() calls render with unsuccessful-application template when status is not ${ELIGIBLE}`, (t) => {
  const render = sinon.spy()

  const req = {
    t: () => {},
    session: {
      eligibilityStatus: 'NOT ELIGIBLE',
      voucherEntitlement: {
        totalVoucherValueInPence: 310
      }
    }
  }

  const res = {
    render
  }

  getConfirmPage(req, res)

  t.equal(render.calledWith('unsuccessful-application'), true, 'calls render with unsuccessful-application template')
  t.end()
})

test('getConfirmPage() calls next with error when invalid voucher value in pence stored in session', (t) => {
  const req = {
    t: () => {},
    session: {
      eligibilityStatus: ELIGIBLE,
      voucherEntitlement: {
        totalVoucherValueInPence: -3
      }
    }
  }

  const res = {}
  const next = sinon.spy()

  getConfirmPage(req, res, next)

  const expectedErrorMessage = 'Invalid voucher value in pence returned from claimant service for ELIGIBLE status: -3'
  const actualErrorMessage = wrapError.getCall(0).args[0].message

  t.equal(next.called, true, 'it calls next()')
  t.equal(actualErrorMessage, expectedErrorMessage, 'it throws an error')
  t.end()
})

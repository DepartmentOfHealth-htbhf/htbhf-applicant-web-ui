const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { ELIGIBLE } = require('../common/constants')

const wrapError = sinon.spy()

const { toPounds, isNilOrLteZero, getConfirmPage } = proxyquire('./confirm', {
  '../../errors': { wrapError }
})

const { getTitle } = require('./confirm')

test('toPounds() converts value in pence to pounds', (t) => {
  const expected = '3.10'
  const result = toPounds(310)
  t.equal(result, expected, 'gets voucher value in pence and converts to pounds')
  t.end()
})

test('isNilOrLteZero()', (t) => {
  t.equal(isNilOrLteZero(0), true, 'returns true for zero')
  t.equal(isNilOrLteZero(-3), true, 'returns true for an integer less than zero')
  t.equal(isNilOrLteZero(null), true, 'returns true for null')
  t.equal(isNilOrLteZero(3), false, 'returns false for a positive integer')
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

  t.equal(render.calledWith('decision'), true, 'calls render with decision template')
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

test('getTitle() returns ’Application successful’ when the claimUpdated field is false', (t) => {
  const req = {
    t: (name) => { return name === 'decision.updatedClaimTitle' ? 'Application Updated' : 'Application successful' },
    session: {
      claimUpdated: false
    }
  }

  const result = getTitle(req)

  t.equal(result, 'Application successful', 'getTitle returns ’Application successful’')
  t.end()
})

test('getTitle() returns ’Application successful’ when the claimUpdated field is undefined', (t) => {
  const req = {
    t: (name) => { return name === 'decision.updatedClaimTitle' ? 'Application Updated' : 'Application successful' },
    session: {}
  }

  const result = getTitle(req)

  t.equal(result, 'Application successful', 'getTitle returns ’Application successful’')
  t.end()
})

test('getTitle() returns ’Application Updated’ when the claimUpdated field is true', (t) => {
  const req = {
    t: (name) => { return name === 'decision.updatedClaimTitle' ? 'Application Updated' : 'Application successful' },
    session: {
      claimUpdated: true
    }
  }

  const result = getTitle(req)

  t.equal(result, 'Application Updated', 'getTitle returns ’Application Updated’')
  t.end()
})

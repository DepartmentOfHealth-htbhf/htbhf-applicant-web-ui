const test = require('tape')
const sinon = require('sinon')
const { ELIGIBLE } = require('../common/constants')
const { toPounds, getDecisionPageFallback } = require('./decision-fallback')

test('toPounds() converts value in pence to pounds', (t) => {
  const expected = '3.10'
  const result = toPounds(310)
  t.equal(result, expected, 'gets voucher value in pence and converts to pounds')
  t.end()
})

test(`getDecisionPageFallback() calls render with decision template when status is ${ELIGIBLE}`, (t) => {
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

  getDecisionPageFallback(req, res)

  t.equal(render.calledWith('decision-fallback-successful'), true, 'calls render with decision template')
  t.end()
})

test(`getDecisionPageFallback() calls render with unsuccessful-application template when status is not ${ELIGIBLE}`, (t) => {
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

  getDecisionPageFallback(req, res)

  t.equal(render.calledWith('decision-fallback-unsuccessful'), true, 'calls render with unsuccessful-application template')
  t.end()
})

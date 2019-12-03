const test = require('tape')
const sinon = require('sinon')
const { ELIGIBLE } = require('../common/constants')
const { toPounds, getDecisionPage } = require('./decision')

test('toPounds() converts value in pence to pounds', (t) => {
  const expected = '3.10'
  const result = toPounds(310)
  t.equal(result, expected, 'gets voucher value in pence and converts to pounds')
  t.end()
})

test(`getDecisionPage() calls render with decision template when status is ${ELIGIBLE}`, (t) => {
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

  getDecisionPage(req, res)

  t.equal(render.calledWith('decision'), true, 'calls render with decision template')
  t.end()
})

test(`getDecisionPage() calls render with unsuccessful-application template when status is not ${ELIGIBLE}`, (t) => {
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

  getDecisionPage(req, res)

  t.equal(render.calledWith('unsuccessful-application'), true, 'calls render with unsuccessful-application template')
  t.end()
})

const test = require('tape')
const sinon = require('sinon')
const { ELIGIBLE } = require('../common/constants')
const { toPounds, getTitle, getDecisionPage } = require('./decision')

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

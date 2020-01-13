const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { identity } = require('ramda')
const { FAIL, PENDING, SUCCESS } = require('./decision-statuses')
const { toPounds } = require('./decision')

const getDecisionStatus = sinon.stub()

const { getDecisionPage } = proxyquire('./decision', {
  './get-decision-status': {
    getDecisionStatus
  }
})

const resetStubs = () => {
  getDecisionStatus.reset()
}

const req = {
  t: identity,
  language: 'en',
  session: {
    verificationResult: {}
  }
}

test('getDecisionPage() throws error if decision status is undefined', (t) => {
  getDecisionStatus.returns(undefined)

  const render = sinon.spy()

  const ineligibleReq = {
    t: identity,
    session: {
      verificationResult: {},
      eligibilityStatus: 'INELIGIBLE'
    }
  }

  const res = {
    render
  }

  t.throws(() => getDecisionPage(ineligibleReq, res),
    /No decision status generated from EligibilityStatus: INELIGIBLE and VerificationResult: {}/,
    'throws an error for undefined decision status')
  t.equal(render.called, false, 'it does not call render()')
  resetStubs()
  t.end()
})

test(`getDecisionPage() renders success view if decision status is ${SUCCESS}`, (t) => {
  getDecisionStatus.returns(SUCCESS)

  const render = sinon.spy()

  const res = {
    render
  }

  getDecisionPage(req, res)

  const expectedTemplateVariables = {
    title: 'decision.success.title',
    body: 'decision.success.body',
    template: 'success'
  }

  t.equal(render.calledWith('decision', expectedTemplateVariables), true, 'it calls render() with the correct arguments')
  resetStubs()
  t.end()
})

test(`getDecisionPage() renders failure view if decision status is ${FAIL}`, (t) => {
  getDecisionStatus.returns(FAIL)

  const render = sinon.spy()

  const res = {
    render
  }

  getDecisionPage(req, res)

  const expectedTemplateVariables = {
    title: 'decision.failure.title',
    body: 'decision.failure.body',
    template: 'failure'
  }

  t.equal(render.calledWith('decision', expectedTemplateVariables), true, 'it calls render() with the correct arguments')
  resetStubs()
  t.end()
})

test(`getDecisionPage() renders pending view if decision status is ${PENDING}`, (t) => {
  getDecisionStatus.returns(PENDING)

  const render = sinon.spy()

  const res = {
    render
  }

  getDecisionPage(req, res)

  const expectedTemplateVariables = {
    title: 'decision.pending.title',
    body: 'decision.pending.body',
    template: 'pending'
  }

  t.equal(render.calledWith('decision', expectedTemplateVariables), true, 'it calls render() with the correct arguments')
  resetStubs()
  t.end()
})

test('toPounds() converts value in pence to pounds', (t) => {
  const expected = '3.10'
  const result = toPounds(310)
  t.equal(result, expected, 'gets voucher value in pence and converts to pounds')
  t.end()
})

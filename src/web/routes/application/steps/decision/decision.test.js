const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { identity } = require('ramda')
const { FAIL } = require('./decision-statuses')

const getDecisionStatus = sinon.stub()

const { getDecisionPage } = proxyquire('./decision', {
  './get-decision-status': {
    getDecisionStatus
  }
})

const resetStubs = () => {
  getDecisionStatus.reset()
}

test('getDecisionPage() calls next if decision status is undefined', (t) => {
  getDecisionStatus.returns(undefined)

  const render = sinon.spy()
  const next = sinon.spy()

  const req = {
    t: identity,
    session: {
      verificationResult: {}
    }
  }

  const res = {
    render
  }

  getDecisionPage(req, res, next)

  t.equal(next.called, true, 'it calls next()')
  t.equal(render.called, false, 'it does not call render()')
  resetStubs()
  t.end()
})

test(`getDecisionPage() renders failure view if decision status is ${FAIL}`, (t) => {
  getDecisionStatus.returns(FAIL)

  const render = sinon.spy()
  const next = sinon.spy()

  const req = {
    t: identity,
    language: 'en',
    session: {
      verificationResult: {}
    }
  }

  const res = {
    render
  }

  getDecisionPage(req, res, next)

  t.equal(next.called, false, 'it does not call next()')
  t.equal(render.calledWith('decision/failure'), true, 'it calls render() with correct template')
  resetStubs()
  t.end()
})

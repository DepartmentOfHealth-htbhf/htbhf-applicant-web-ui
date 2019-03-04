const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { states } = require('../common/state-machine')
const { CHECK_URL, CONFIRM_URL } = require('../common/constants')

const post = sinon.stub()

const { postCheck } = proxyquire('./post', {
  'request-promise': { post },
  './create-request-body': {
    createRequestBody: () => {}
  }
})

const config = {
  environment: {
    CLAIMANT_SERVICE_URL: 'https://claim.com'
  }
}

test('unsuccessful post calls next with error', async (t) => {
  const req = {}
  const res = {}
  const next = sinon.spy()

  post.returns(new Error('error'))

  try {
    await postCheck(config)(req, res, next)
    t.equal(next.calledWith(sinon.match.instanceOf(Error)), true)
    t.end()
  } catch (error) {
    t.fail(error)
  }
})

test(`successful post sets next allowed step to ${CONFIRM_URL}`, async (t) => {
  const steps = []
  const next = sinon.spy()
  const redirect = sinon.spy()
  const req = {
    path: CHECK_URL,
    headers: [],
    sessionID: '123',
    claim: {},
    session: {
      state: states.IN_REVIEW
    }
  }
  const res = { redirect }

  post.returns(Promise.resolve())

  try {
    await postCheck(steps, config)(req, res, next)
    t.equal(req.session.nextAllowedStep, CONFIRM_URL, `it sets next allowed step to ${CONFIRM_URL}`)
    t.equal(redirect.called, true, 'it calls redirect()')
    t.end()
  } catch (error) {
    t.fail(error)
  }
})

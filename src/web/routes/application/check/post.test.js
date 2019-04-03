const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { states } = require('../common/state-machine')
const { CHECK_URL, CONFIRM_URL } = require('../common/constants')

const post = sinon.stub()

const { transformResponse, postCheck } = proxyquire('./post', {
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

test('transformResponse() returns response for successful statusCode', (t) => {
  const body = {}
  const response = { statusCode: 200 }
  const result = transformResponse(body, response)
  t.equal(result, response, 'returns response for successful statusCode')
  t.end()
})

test('transformResponse() returns response for not found statusCode', (t) => {
  const body = {}
  const response = { statusCode: 404 }
  const result = transformResponse(body, response)
  t.equal(result, response, 'returns response for not found statusCode')
  t.end()
})

test('transformResponse() throws an error for error statusCode', (t) => {
  const body = {}
  const response = { statusCode: 500 }
  const result = transformResponse.bind(null, body, response)
  t.throws(result, /Error posting to claimant service/, 'throws an error for error statusCode')
  t.end()
})

test('unsuccessful post calls next with error', async (t) => {
  const req = {
    headers: {},
    session: {}
  }
  const res = {}
  const next = sinon.spy()

  const error = new Error('error')
  post.returns(Promise.reject(error))

  postCheck({}, config)(req, res, next)
    .then(() => {
      t.equal(next.calledWith(sinon.match.instanceOf(Error)), true, 'calls next with error')
      t.end()
    })
    .catch((error) => {
      t.fail(error)
    })
})

test(`successful post sets next allowed step to ${CONFIRM_URL} and eligibility status to the status returned`, async (t) => {
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

  post.returns(Promise.resolve({
    body: {
      eligibilityStatus: 'ELIGIBLE'
    }
  }))

  postCheck(steps, config)(req, res, next)
    .then(() => {
      t.equal(req.session.nextAllowedStep, CONFIRM_URL, `it sets next allowed step to ${CONFIRM_URL}`)
      t.equal(req.session.eligibilityStatus, 'ELIGIBLE', 'it sets the eligibility status to ELIGIBLE')
      t.equal(redirect.called, true, 'it calls redirect()')
      t.end()
    })
    .catch((error) => {
      t.fail(error)
    })
})

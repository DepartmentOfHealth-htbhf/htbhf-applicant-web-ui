const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { states, testUtils } = require('../../flow-control')
const { CHECK_ANSWERS_URL, CONFIRM_URL } = require('../../paths')
const { ELIGIBLE } = require('../common/constants')

const { buildSessionForJourney, getNextAllowedPathForJourney } = testUtils

const post = sinon.stub()
const redirect = sinon.spy()
const render = sinon.spy()
const next = sinon.spy()

const REQUEST_BODY = { name: 'Lisa' }

const { handleErrorResponse, postTermsAndConditions } = proxyquire('./post', {
  'request-promise': { post },
  './create-request-body': {
    createRequestBody: () => REQUEST_BODY
  }
})

const CONFIG = {
  environment: {
    CLAIMANT_SERVICE_URL: 'https://claim.com'
  }
}

const SUCCESSFUL_RESPONSE = {
  body: {
    eligibilityStatus: ELIGIBLE,
    voucherEntitlement: {
      totalVoucherValueInPence: 310
    },
    claimUpdated: true
  }
}

const resetStubs = () => {
  post.reset()
  redirect.resetHistory()
  render.resetHistory()
  next.resetHistory()
}

test('handleErrorResponse() returns response for successful statusCode', (t) => {
  const body = {}
  const response = { statusCode: 200 }
  const result = handleErrorResponse(body, response)
  t.equal(result, response, 'returns response for successful statusCode')
  t.end()
})

test('handleErrorResponse() returns response for not found statusCode', (t) => {
  const body = {}
  const response = { statusCode: 404 }
  const result = handleErrorResponse(body, response)
  t.equal(result, response, 'returns response for not found statusCode')
  t.end()
})

test('handleErrorResponse() throws an error for error statusCode', (t) => {
  const body = { message: 'There was a problem' }
  const response = { statusCode: 500 }
  const result = handleErrorResponse.bind(null, body, response)
  t.throws(result, /{"message":"There was a problem"}/, 'throws an error for error statusCode')
  t.end()
})

test('failure to agree to terms and conditions returns to the terms-and-conditions page', async (t) => {
  const req = {
    headers: {},
    session: {},
    t: () => {},
    csrfToken: () => {}
  }

  const res = { locals: {}, redirect, render }
  const errors = ['error']

  const journey = {
    steps: [{ path: '/first', next: () => '/second' }, { path: '/second' }]
  }

  const { postTermsAndConditions } = proxyquire('./post', {
    'express-validator': {
      validationResult: () => ({
        isEmpty: () => false,
        array: () => errors
      })
    }
  })

  postTermsAndConditions(CONFIG, journey)(req, res)

  t.deepEqual(res.locals.errors, errors, 'it should add errors to locals')
  t.equal(render.called, true, 'it should call render()')
  t.equal(redirect.called, false, 'it does not call redirect()')
  resetStubs()
  t.end()
})

test('unsuccessful post calls next with error', async (t) => {
  const req = {
    headers: {},
    session: {}
  }

  const res = { redirect, render }
  const error = new Error('error')
  post.returns(Promise.reject(error))

  postTermsAndConditions(CONFIG, {})(req, res, next)
    .then(() => {
      t.equal(next.calledWith(sinon.match.instanceOf(Error)), true, 'calls next with error')
      t.end()
    })
    .catch((error) => {
      t.fail(error)
    })
    .finally(() => resetStubs())
})

test(`successful post sets next allowed step to ${CONFIRM_URL} and sets returned fields in session`, async (t) => {
  const journey = {
    name: 'apply',
    steps: []
  }

  const req = {
    path: CHECK_ANSWERS_URL,
    headers: [],
    sessionID: '123',
    claim: {},
    session: {
      ...buildSessionForJourney({ journeyName: 'apply', state: states.IN_REVIEW })
    }
  }

  const res = { redirect, render }

  post.resolves(SUCCESSFUL_RESPONSE)

  postTermsAndConditions(CONFIG, journey)(req, res, next)
    .then(() => {
      t.equal(getNextAllowedPathForJourney('apply', req), CONFIRM_URL, `it sets next allowed step to ${CONFIRM_URL}`)
      t.equal(req.session.eligibilityStatus, ELIGIBLE, 'it sets the eligibility status to ELIGIBLE')
      t.deepEqual(req.session.voucherEntitlement, { totalVoucherValueInPence: 310 }, 'it sets the voucher entitlement field')
      t.equal(req.session.claimUpdated, true, 'it sets the claim updated field')
      t.equal(redirect.called, true, 'it calls redirect()')
      t.equal(render.called, false, 'it does not call render()')
      t.end()
    })
    .catch((error) => {
      t.fail(error)
    })
    .finally(() => resetStubs())
})

test('sends a POST request with the correct parameters', async (t) => {
  const journey = {
    name: 'apply',
    steps: [],
    endpoint: '/journey-endpoint'
  }

  const req = {
    session: {
      ...buildSessionForJourney({ journeyName: 'apply', state: states.IN_REVIEW })
    },
    headers: {
      'x-request-id': '456'
    },
    sessionID: '123'
  }

  const res = { redirect, render }

  post.resolves(SUCCESSFUL_RESPONSE)

  postTermsAndConditions(CONFIG, journey)(req, res, next)
    .then(() => {
      const { uri, headers, body } = post.args[0][0]
      t.equal(uri, 'https://claim.com/journey-endpoint', 'calls the journey defined endpoint')
      t.deepEqual(headers, { 'X-Request-ID': '456', 'X-Session-ID': '123' }, 'sets the correct headers')
      t.deepEqual(body, REQUEST_BODY, 'sets body to the result of calling createRequestBody()')
      t.end()
    })
    .finally(() => resetStubs())
})

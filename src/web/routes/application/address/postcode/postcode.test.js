require('dotenv').config()

const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const TEST_FIXTURES = require('./test-fixtures.json')
const { standardisePostcode } = require('./postcode')
const { states } = require('../../common/state-machine')

const errorSpy = sinon.spy()
const logger = { error: errorSpy }
const request = sinon.stub()
const validationResult = sinon.stub()

const { behaviourForPost, behaviourForGet } = proxyquire(
  './postcode', { 'request-promise': request, '../../../../logger': { logger } },
  './express-validator', { 'validationResult': validationResult })

const config = { environment: { OS_PLACES_API_KEY: '123', GA_TRACKING_ID: 'UA-133839203-1', GOOGLE_ANALYTICS_URI: 'http://localhost:8150/collect' } }

test('behaviourForPost() handles successful address lookup', async (t) => {
  const req = {
    headers: { 'x-forwarded-for': '100.200.0.45' },
    body: { postcode: 'BS7 8EE' },
    session: { id: 'skdjfhs-sdfnks-sdfhbsd' }
  }
  const res = {}
  const next = sinon.spy()

  const expectedAdresses = [
    {
      ADDRESS: 'Alan Jeffery Engineering, 1, Valley Road, Plymouth',
      ORGANISATION_NAME: 'Alan Jeffery Engineering',
      BUILDING_NUMBER: '1',
      THOROUGHFARE_NAME: 'Valley Road',
      DEPENDENT_THOROUGHFARE_NAME: 'Upper Valley Road',
      POST_TOWN: 'Plymouth',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'City Of Plymouth'
    }, {
      ADDRESS: 'Dulux Decorator Centre, 2, Valley Road, Plymouth',
      ORGANISATION_NAME: 'Dulux Decorator Centre',
      BUILDING_NUMBER: '2',
      THOROUGHFARE_NAME: 'Valley Road',
      DEPENDENT_THOROUGHFARE_NAME: 'Upper Valley Road',
      POST_TOWN: 'Plymouth',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'City Of Plymouth'
    }, {
      ADDRESS: 'Mill Autos, 3, Valley Road, Plymouth',
      ORGANISATION_NAME: 'Mill Autos',
      BUILDING_NUMBER: '3',
      THOROUGHFARE_NAME: 'Valley Road',
      DEPENDENT_THOROUGHFARE_NAME: 'Upper Valley Road',
      POST_TOWN: 'Plymouth',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'City Of Plymouth'
    }, {
      ADDRESS: 'Goat Hill Farm, 2, Troll Bridge, Goat Hill, Slaithwaite, Slaith, Huddersfield',
      ORGANISATION_NAME: 'Goat Hill Farm',
      BUILDING_NUMBER: '2',
      THOROUGHFARE_NAME: 'Goat Hill',
      DEPENDENT_THOROUGHFARE_NAME: 'Troll Bridge',
      DOUBLE_DEPENDENT_LOCALITY: 'Slaithwaite',
      DEPENDENT_LOCALITY: 'Slaith',
      POST_TOWN: 'Huddersfield',
      POSTCODE: 'HD7 5UZ',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'Kirklees'
    }, {
      ADDRESS: '10a, Mayfield Avenue, Weston-Super-Mare',
      BUILDING_NAME: '10a',
      THOROUGHFARE_NAME: 'Mayfield Avenue',
      POST_TOWN: 'Weston-Super-Mare',
      POSTCODE: 'BS22 6AA',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'North Somerset'
    }
  ]

  request.onFirstCall().resolves(TEST_FIXTURES).onSecondCall().resolves()

  const expectedGoogleAnalyticsRequestArgs = {
    uri: 'http://localhost:8150/collect?v=1&tid=UA-133839203-1&t=event&cid=skdjfhs-sdfnks-sdfhbsd&ec=AddressLookup&ea=SuccessfulLookup&el=100.200.0.45&ev=44',
    json: true,
    timeout: 5000
  }

  try {
    await behaviourForPost(config)(req, res, next)

    t.deepEqual(req.session.postcodeLookupResults, expectedAdresses, 'adds postcode lookup results to session')
    t.deepEqual(request.getCall(1).args[0], expectedGoogleAnalyticsRequestArgs, 'should make request to Google Analytcis with correct parameters')
    t.equal(next.called, true, 'calls next()')
  } catch (error) {
    // Explicitly fail the test with the message from the error
    t.fail(error)
  }

  next.resetHistory()
  request.reset()
  t.end()
})

test('behaviourForPost() handles address lookup error', async (t) => {
  errorSpy.resetHistory()
  const req = {
    headers: { 'x-forwarded-for': '100.200.0.45' },
    body: { postcode: 'BS7 8EE' },
    session: { id: 'skdjfhs-sdfnks-sdfhbsd' }
  }
  const res = {}
  const next = sinon.spy()

  request.onFirstCall().rejects(new Error('error')).onSecondCall().resolves()

  const expectedGoogleAnalyticsRequestArgs = {
    uri: 'http://localhost:8150/collect?v=1&tid=UA-133839203-1&t=event&cid=skdjfhs-sdfnks-sdfhbsd&ec=AddressLookup&ea=FailedLookup&el=100.200.0.45&ev=0',
    json: true,
    timeout: 5000
  }

  try {
    await behaviourForPost(config)(req, res, next)

    t.deepEqual(req.session.postcodeLookupResults, undefined, 'does not add postcode lookup results to session')
    t.equal(req.session.postcodeLookupError, true, 'sets postcode lookup error on session')
    t.equal(next.called, true, 'calls next()')
    t.equal(errorSpy.called, true, 'logs an error')
    t.deepEqual(request.getCall(1).args[0], expectedGoogleAnalyticsRequestArgs, 'should make request to Google Analytics with correct parameters')
  } catch (error) {
    // Explicitly fail the test with the message from the error
    t.fail(error)
  }

  next.resetHistory()
  request.reset()
  t.end()
})

test('behaviourForPost() does not call os places when there are validation errors', (t) => {
  const req = {}
  const res = {}
  const next = () => {}
  request.reset()
  validationResult.returns(['error'])

  behaviourForPost(req, res, next)

  t.equal(request.called, false, 'should not call os places')
  t.end()
})

test('standardisePostcode() standardises the postcode', (t) => {
  t.equal(standardisePostcode('AB1 1AB'), 'AB11AB', 'should removes space from postcode')
  t.equal(standardisePostcode('AB1      1AB'), 'AB11AB', 'should remove multiple spaces from postcode')
  t.equal(standardisePostcode('   AB1 1AB '), 'AB11AB', 'should remove spaces from around postcode')
  t.equal(standardisePostcode('ab11ab'), 'AB11AB', 'should upper case postcode')
  t.end()
})

test(`behaviourForGet() sets state to ${states.IN_PROGRESS} and resets postcodeLookupError`, (t) => {
  const req = {
    session: {
      state: states.IN_REVIEW,
      postcodeLookupError: true
    }
  }

  const res = {}
  const next = sinon.spy()

  behaviourForGet()(req, res, next)

  t.equal(next.called, true, 'calls next()')
  t.equal(req.session.state, states.IN_PROGRESS, `updates state to ${states.IN_PROGRESS}`)
  t.equal(req.session.postcodeLookupError, undefined, 'resets postcodeLookupError')
  t.end()
})

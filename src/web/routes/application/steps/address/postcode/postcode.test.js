const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const TEST_FIXTURES = require('./test-fixtures.json')
const { states, testUtils } = require('../../../flow-control')

const { IN_PROGRESS, IN_REVIEW } = states
const { buildSessionForJourney, getStateForJourney } = testUtils

const errorSpy = sinon.spy()
const logger = { error: errorSpy }
const isEmpty = sinon.stub()
const validationResult = () => ({ isEmpty })
const auditSuccessfulPostcodeLookup = sinon.stub()
const auditFailedPostcodeLookup = sinon.stub()
const auditInvalidPostcodeLookup = sinon.stub()
const getAddressLookupResults = sinon.stub()

const { behaviourForPost, behaviourForGet } = proxyquire(
  './postcode', {
    'express-validator': { validationResult },
    '../../../../../logger': { logger },
    './os-places': { auditSuccessfulPostcodeLookup, auditFailedPostcodeLookup, auditInvalidPostcodeLookup, getAddressLookupResults }
  }
)

const config = { environment: { OS_PLACES_API_KEY: '123', GA_TRACKING_ID: 'UA-133839203-1', GOOGLE_ANALYTICS_URI: 'http://localhost:8150/collect' } }

const resetStubs = () => {
  getAddressLookupResults.reset()
  isEmpty.reset()
  errorSpy.resetHistory()
}

test('behaviourForPost() handles successful address lookup', async (t) => {
  // Set return values for stubs
  isEmpty.returns(true)
  getAddressLookupResults.resolves(TEST_FIXTURES)

  const req = {
    headers: { 'x-forwarded-for': '100.200.0.45' },
    body: { postcode: 'BS7 8EE' },
    session: { id: 'skdjfhs-sdfnks-sdfhbsd' }
  }
  const res = {}
  const next = sinon.spy()

  const expectedAddresses = [
    {
      ADDRESS: 'Alan Jeffery Engineering, 1, Valley Road, Plymouth',
      ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
      BUILDING_NUMBER: '1',
      DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
    },
    {
      ADDRESS: 'Dulux Decorator Centre, 2, Valley Road, Plymouth',
      ORGANISATION_NAME: 'DULUX DECORATOR CENTRE',
      BUILDING_NUMBER: '2',
      DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
    },
    {
      ADDRESS: 'Mill Autos, 3, Valley Road, Plymouth',
      ORGANISATION_NAME: 'MILL AUTOS',
      BUILDING_NUMBER: '3',
      DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
    },
    {
      ADDRESS: 'Goat Hill Farm, 2, Troll Bridge, Goat Hill, Slaithwaite, Slaith, Huddersfield',
      ORGANISATION_NAME: 'GOAT HILL FARM',
      BUILDING_NUMBER: '2',
      DEPENDENT_THOROUGHFARE_NAME: 'TROLL BRIDGE',
      THOROUGHFARE_NAME: 'GOAT HILL',
      DOUBLE_DEPENDENT_LOCALITY: 'SLAITHWAITE',
      DEPENDENT_LOCALITY: 'SLAITH',
      POST_TOWN: 'HUDDERSFIELD',
      POSTCODE: 'HD7 5UZ',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'KIRKLEES'
    },
    {
      ADDRESS: '10a, Mayfield Avenue, Weston-Super-Mare',
      BUILDING_NAME: '10A',
      THOROUGHFARE_NAME: 'MAYFIELD AVENUE',
      POST_TOWN: 'WESTON-SUPER-MARE',
      POSTCODE: 'BS22 6AA',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'NORTH SOMERSET'
    }
  ]

  await behaviourForPost(config)(req, res, next)

  t.deepEqual(req.session.postcodeLookupResults, expectedAddresses, 'adds postcode lookup results to session')
  t.deepEqual(auditSuccessfulPostcodeLookup.getCall(0).args, [config, req, 44], 'should audit successful postcode with correct parameters')
  t.equal(next.called, true, 'calls next()')

  resetStubs()
  t.end()
})

test('behaviourForPost() handles address lookup error', async (t) => {
  // Set return values for stubs
  isEmpty.returns(true)
  getAddressLookupResults.rejects(new Error('error'))

  const req = {
    headers: { 'x-forwarded-for': '100.200.0.45' },
    body: { postcode: 'BS7 8EE' },
    session: { id: 'skdjfhs-sdfnks-sdfhbsd' }
  }
  const res = {}
  const next = sinon.spy()

  await behaviourForPost(config)(req, res, next)

  t.deepEqual(req.session.postcodeLookupResults, undefined, 'does not add postcode lookup results to session')
  t.equal(req.session.postcodeLookupError, true, 'sets postcode lookup error on session')
  t.equal(next.called, true, 'calls next()')
  t.equal(errorSpy.getCall(0).args[0], 'Error looking up address for postcode: Error: error', 'logs an error')
  t.deepEqual(auditFailedPostcodeLookup.getCall(0).args, [config, req], 'should audit failed postcode with correct parameters')

  resetStubs()
  t.end()
})

test('behaviourForPost() does not call os places when there are validation errors', async (t) => {
  // Set return values for stubs
  isEmpty.returns(false)

  const req = {}
  const res = {}
  const next = () => {}

  await behaviourForPost(config)(req, res, next)
  t.equal(getAddressLookupResults.called, false, 'should not call getAddressLookupResults()')
  resetStubs()
  t.end()
})

test('behaviourForPost() handles 400 response from OS places API', async (t) => {
  // Set return values for stubs
  const osPlacesError = new Error('Os places error')
  osPlacesError.statusCode = 400
  getAddressLookupResults.rejects(osPlacesError)
  isEmpty.returns(true)

  const req = {
    headers: { 'x-forwarded-for': '100.200.0.45' },
    body: { postcode: 'BS14TM' },
    session: { id: 'skdjfhs-sdfnks-sdfhbsd' }
  }
  const res = {}
  const next = sinon.spy()

  await behaviourForPost(config)(req, res, next)

  t.deepEqual(req.session.postcodeLookupResults, [], 'adds empty postcode lookup results to session')
  t.equal(req.session.postcodeLookupError, undefined, 'does not set postcode lookup error on session')
  t.deepEqual(auditInvalidPostcodeLookup.getCall(0).args, [config, req], 'should audit invalid postcode with correct parameters')
  t.equal(next.called, true, 'calls next()')

  resetStubs()
  t.end()
})

test('behaviourForPost() resets address in session', (t) => {
  // Set return values for stubs
  isEmpty.returns(true)
  getAddressLookupResults.resolves(TEST_FIXTURES)

  const req = {
    session: {
      claim: {
        firstName: 'Eric',
        addressLine1: '29 Acacia Road',
        addressLine2: 'Downtown',
        townOrCity: 'Nuttytown',
        county: 'Bedfordshire',
        postcode: 'BN11NA'
      }
    }
  }

  const res = {}
  const next = () => {}

  const expectedClaim = {
    firstName: 'Eric',
    addressLine1: '',
    addressLine2: '',
    townOrCity: '',
    county: '',
    postcode: ''
  }

  behaviourForPost()(req, res, next)

  t.deepEqual(req.session.claim, expectedClaim, 'resets address in session')
  resetStubs()
  t.end()
})

test('behaviourForPost() does not reset address in session if validation errors exist', (t) => {
  // Set return values for stubs
  isEmpty.returns(false)
  getAddressLookupResults.resolves(TEST_FIXTURES)

  const claim = {
    firstName: 'Eric',
    addressLine1: '29 Acacia Road',
    addressLine2: 'Downtown',
    townOrCity: 'Nuttytown',
    county: 'Bedfordshire',
    postcode: 'BN11NA'
  }

  // Create copies of claim object to ensure they are compared by value
  const req = { session: { claim: { ...claim } } }
  const res = {}
  const next = () => {}
  const expectedClaim = { ...claim }

  behaviourForPost()(req, res, next)

  t.deepEqual(req.session.claim, expectedClaim, 'does not reset address in session')
  resetStubs()
  t.end()
})

test(`behaviourForGet() sets state to ${IN_PROGRESS} and resets postcodeLookupError`, (t) => {
  const config = {}
  const journey = { name: 'apply' }

  const req = {
    session: {
      postcodeLookupError: true,
      ...buildSessionForJourney({ journeyName: 'apply', state: IN_REVIEW })
    }
  }

  const res = {}
  const next = sinon.spy()

  behaviourForGet(config, journey)(req, res, next)

  t.equal(next.called, true, 'calls next()')
  t.equal(getStateForJourney('apply')(req), IN_PROGRESS, `updates state to ${IN_PROGRESS}`)
  t.equal(req.session.postcodeLookupError, undefined, 'resets postcodeLookupError')
  t.end()
})

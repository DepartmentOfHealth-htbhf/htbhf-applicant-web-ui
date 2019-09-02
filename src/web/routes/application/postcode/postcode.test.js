const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const TEST_FIXTURES = require('./test-fixtures.json')
const { standardisePostcode } = require('./postcode')

const request = sinon.stub()
const { behaviourForPost } = proxyquire('./postcode', { 'request-promise': request })
const config = { environment: { OS_PLACES_API_KEY: '123' } }

test('behaviourForPost() handles successful address lookup', async (t) => {
  const req = { body: { postcode: 'BS7 8EE' }, session: {} }
  const res = {}
  const next = sinon.spy()

  const expectedAdresses = [
    {
      ADDRESS: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF',
      ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
      BUILDING_NUMBER: '1',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
    }, {
      ADDRESS: 'DULUX DECORATOR CENTRE, 2, VALLEY ROAD, PLYMOUTH, PL7 1RF',
      ORGANISATION_NAME: 'DULUX DECORATOR CENTRE',
      BUILDING_NUMBER: '2',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
    }, {
      ADDRESS: 'MILL AUTOS, 3, VALLEY ROAD, PLYMOUTH, PL7 1RF',
      ORGANISATION_NAME: 'MILL AUTOS',
      BUILDING_NUMBER: '3',
      THOROUGHFARE_NAME: 'VALLEY ROAD',
      DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
      POST_TOWN: 'PLYMOUTH',
      POSTCODE: 'PL7 1RF',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
    }, {
      ADDRESS: 'GOAT HILL FARM, 2, TROLL BRIDGE, GOAT HILL, SLAITHWAITE, SLAITH, HUDDERSFIELD, HD7 5UZ',
      ORGANISATION_NAME: 'GOAT HILL FARM',
      BUILDING_NUMBER: '2',
      THOROUGHFARE_NAME: 'GOAT HILL',
      DEPENDENT_THOROUGHFARE_NAME: 'TROLL BRIDGE',
      DOUBLE_DEPENDENT_LOCALITY: 'SLAITHWAITE',
      DEPENDENT_LOCALITY: 'SLAITH',
      POST_TOWN: 'HUDDERSFIELD',
      POSTCODE: 'HD7 5UZ',
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'KIRKLEES'
    }
  ]

  request.returns(Promise.resolve(TEST_FIXTURES))

  try {
    await behaviourForPost(config)(req, res, next)

    t.deepEqual(req.session.postcodeLookupResults, expectedAdresses, 'adds postcode lookup results to session')
    t.equal(next.called, true, 'calls next()')
  } catch (error) {
    // Explicitly fail the test with the message from the error
    t.fail(error)
  }

  next.resetHistory()
  t.end()
})

test('behaviourForPost() handles address lookup error', async (t) => {
  const req = { body: { postcode: 'BS7 8EE' }, session: {} }
  const res = {}
  const next = sinon.spy()

  request.returns(Promise.reject(new Error('error')))

  try {
    await behaviourForPost(config)(req, res, next)

    t.deepEqual(req.session.postcodeLookupResults, undefined, 'does not add postcode lookup results to session')
    t.equal(next.calledWith(sinon.match.instanceOf(Error)), true, 'calls next() with error')
  } catch (error) {
    // Explicitly fail the test with the message from the error
    t.fail(error)
  }

  next.resetHistory()
  t.end()
})

test('standardisePostcode() standardises the postcode', (t) => {
  t.equal(standardisePostcode('AB1 1AB'), 'AB11AB', 'should removes space from postcode')
  t.equal(standardisePostcode('AB1      1AB'), 'AB11AB', 'should remove multiple spaces from postcode')
  t.equal(standardisePostcode('   AB1 1AB '), 'AB11AB', 'should remove spaces from around postcode')
  t.equal(standardisePostcode('ab11ab'), 'AB11AB', 'should upper case postcode')
  t.end()
})

const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const TEST_FIXTURES = require('./test-fixtures.json')

const request = sinon.stub()
const { behaviourForPost } = proxyquire('./postcode', { 'request-promise': request })
const config = { environment: { OS_PLACES_API_KEY: '123' } }

test('behaviourForPost() handles succesful address lookup', async (t) => {
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

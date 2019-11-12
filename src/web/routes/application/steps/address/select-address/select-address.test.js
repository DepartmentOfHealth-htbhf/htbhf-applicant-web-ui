const test = require('tape')
const sinon = require('sinon')
const { behaviourForGet, behaviourForPost, findAddress, contentSummary } = require('./select-address')
const { states, testUtils } = require('../../../flow-control')

const { buildSessionForJourney, getNextAllowedPathForJourney } = testUtils
const { IN_PROGRESS } = states

const CONFIG = {}
const APPLY = 'apply'
const JOURNEY = { name: APPLY }

const getNextAllowedPathForApplyJourney = getNextAllowedPathForJourney(APPLY)

const POSTCODE_LOOKUP_RESULTS = [
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

test('behaviourForGet() adds addresses to res.locals and resets the address', (t) => {
  const req = {
    session: {
      postcodeLookupResults: POSTCODE_LOOKUP_RESULTS,
      postcodeLookupError: false,
      claim: {
        selectedAddress: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF'
      },
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_PROGRESS })
    }
  }

  const res = { locals: {} }
  const next = sinon.spy()
  const expected = [
    {
      text: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF',
      value: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF'
    }, {
      text: 'DULUX DECORATOR CENTRE, 2, VALLEY ROAD, PLYMOUTH, PL7 1RF',
      value: 'DULUX DECORATOR CENTRE, 2, VALLEY ROAD, PLYMOUTH, PL7 1RF'
    }, {
      text: 'MILL AUTOS, 3, VALLEY ROAD, PLYMOUTH, PL7 1RF',
      value: 'MILL AUTOS, 3, VALLEY ROAD, PLYMOUTH, PL7 1RF'
    }
  ]

  behaviourForGet(CONFIG, JOURNEY)(req, res, next)

  t.equal(req.session.claim.selectAddress, undefined, 'should reset the selected address')
  t.equal(getNextAllowedPathForApplyJourney(req), '/manual-address', 'next allowed step should be manual address')
  t.deepEqual(res.locals.addresses, expected, 'adds addresses to res.locals')
  t.equal(res.locals.postcodeLookupError, false, 'sets res.locals.postcodeLookupError')
  t.equal(next.called, true, 'calls next()')
  t.end()
})

test('behaviourForGet() handles postcodeLookupErrors', (t) => {
  const req = {
    session: {
      postcodeLookupError: true,
      claim: {
        selectedAddress: {}
      },
      ...buildSessionForJourney({ journeyName: APPLY, state: IN_PROGRESS })
    }
  }

  const res = { locals: {} }
  const next = sinon.spy()

  behaviourForGet(CONFIG, JOURNEY)(req, res, next)

  t.equal(res.locals.postcodeLookupError, true, 'should set res.locals.postcodeLookupError to value on session')
  t.equal(getNextAllowedPathForApplyJourney(req), '/manual-address', 'next allowed step should be manual address')
  t.end()
})

test('behaviourForPost() adds transformed address to claim', (t) => {
  const req = {
    session: {
      claim: {
        nino: 'QQ123456C'
      },
      postcodeLookupResults: [
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
        }
      ]
    },
    body: {
      selectedAddress: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF'
    }
  }
  const res = {}
  const next = sinon.spy()

  const expectedClaim = {
    nino: 'QQ123456C',
    addressLine1: 'Alan Jeffery Engineering',
    addressLine2: '1 Upper Valley Road, Valley Road',
    townOrCity: 'Plymouth',
    county: 'City Of Plymouth',
    postcode: 'PL7 1RF'
  }

  behaviourForPost()(req, res, next)

  t.deepEqual(req.session.claim, expectedClaim, 'Expected the claim to be appended with the transformed address.')
  t.equal(next.called, true, 'calls next()')
  t.end()
})

test('behaviourForPost calls next if no address is selected', (t) => {
  const req = {
    session: {
      claim: {
        nino: 'QQ123456C'
      },
      postcodeLookupResults: [
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
        }
      ]
    },
    body: {
    }
  }
  const res = {}
  const next = sinon.spy()

  behaviourForPost()(req, res, next)

  t.equal(next.called, true, 'calls next()')
  t.end()
})

test('findAddress finds the address matching the selected address passed in', (t) => {
  const postcodeLookupResults = [
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
    }
  ]
  const selectedAddress = 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF'

  const expectedAddress = {
    ADDRESS: 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF',
    ORGANISATION_NAME: 'ALAN JEFFERY ENGINEERING',
    BUILDING_NUMBER: '1',
    THOROUGHFARE_NAME: 'VALLEY ROAD',
    DEPENDENT_THOROUGHFARE_NAME: 'UPPER VALLEY ROAD',
    POST_TOWN: 'PLYMOUTH',
    POSTCODE: 'PL7 1RF',
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF PLYMOUTH'
  }

  const address = findAddress(selectedAddress, postcodeLookupResults)

  t.deepEqual(address, expectedAddress, 'Expected to find address')
  t.end()
})

test('findAddress throws an error when the address is not found', (t) => {
  const postcodeLookupResults = []
  const selectedAddress = 'ALAN JEFFERY ENGINEERING, 1, VALLEY ROAD, PLYMOUTH, PL7 1RF'

  t.throws(
    findAddress.bind(null, selectedAddress, postcodeLookupResults),
    /Unable to find selected address in list of postcode lookup results/,
    'Should throw an error when no address is found'
  )
  t.end()
})

test('Address contentSummary() should return content summary in correct format when there is a selected address on the session', (t) => {
  const req = {
    t: string => string,
    session: {
      claim: {
        addressLine1: 'Flat b',
        addressLine2: '221 Baker street',
        townOrCity: 'London',
        county: 'Devon',
        postcode: 'aa1 1ab',
        selectedAddress: 'Flat b, 221 Baker Street, London, Devon, aa1 1ab'
      }
    }
  }

  const result = contentSummary(req)

  const expected = {
    key: 'address.summaryKey',
    value: 'Flat b\n221 Baker street\nLondon\nDevon\naa1 1ab'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format when there is a selected address on the session')
  t.end()
})

test('Address contentSummary() should return null when there is no selected address on the session', (t) => {
  const req = {
    claim: {}
  }

  const result = contentSummary(req)

  t.deepEqual(result, null, 'should return null when there is no selected address on the session')
  t.end()
})

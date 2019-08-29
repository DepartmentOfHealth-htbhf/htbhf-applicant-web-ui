const test = require('tape')
const sinon = require('sinon')
const { behaviourForGet } = require('./select-address')

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

test('behaviourForGet() adds addresses to res.locals', (t) => {
  const req = {
    session: {
      postcodeLookupResults: POSTCODE_LOOKUP_RESULTS
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

  behaviourForGet()(req, res, next)

  t.deepEqual(res.locals.addresses, expected, 'adds addresses to res.locals')
  t.equal(next.called, true, 'calls next()')
  t.end()
})

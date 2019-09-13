const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const request = sinon.stub().resolves()

const {
  auditSuccessfulPostcodeLookup,
  auditInvalidPostcodeLookup,
  auditFailedPostcodeLookup,
  standardisePostcode,
  getAddressLookupResults } = proxyquire(
  './os-places', {
    'request-promise': request
  }
)

const req = {
  headers: {
    'x-forwarded-for': '100.200.0.45'
  },
  body: {
    postcode: 'BS7 8EE'
  },
  session: {
    id: 'skdjfhs-sdfnks-sdfhbsd'
  }
}

const config = {
  environment: {
    OS_PLACES_URI: 'localhost:8150',
    OS_PLACES_API_KEY: '123',
    GA_TRACKING_ID: 'UA-133839203-1',
    GOOGLE_ANALYTICS_URI: 'http://localhost:8150/collect'
  }
}

test('should correctly audit successful lookup', (t) => {
  auditSuccessfulPostcodeLookup(config, req, 10)

  const expectedGoogleAnalyticsRequestArgs = {
    uri: 'http://localhost:8150/collect?v=1&tid=UA-133839203-1&t=event&cid=skdjfhs-sdfnks-sdfhbsd&ec=AddressLookup&ea=SuccessfulLookup&el=100.200.0.45&ev=10',
    json: true,
    timeout: 5000
  }

  t.deepEqual(request.getCall(0).args[0], expectedGoogleAnalyticsRequestArgs, 'should audit successful lookup with the correct arguments')

  request.resetHistory()
  t.end()
})

test('should correctly audit invalid lookup', (t) => {
  auditInvalidPostcodeLookup(config, req)

  const expectedGoogleAnalyticsRequestArgs = {
    uri: 'http://localhost:8150/collect?v=1&tid=UA-133839203-1&t=event&cid=skdjfhs-sdfnks-sdfhbsd&ec=AddressLookup&ea=InvalidPostcode&el=100.200.0.45&ev=0',
    json: true,
    timeout: 5000
  }

  t.deepEqual(request.getCall(0).args[0], expectedGoogleAnalyticsRequestArgs, 'should audit invalid lookup with the correct arguments')
  request.resetHistory()
  t.end()
})

test('should correctly failed invalid lookup', (t) => {
  auditFailedPostcodeLookup(config, req)

  const expectedGoogleAnalyticsRequestArgs = {
    uri: 'http://localhost:8150/collect?v=1&tid=UA-133839203-1&t=event&cid=skdjfhs-sdfnks-sdfhbsd&ec=AddressLookup&ea=FailedLookup&el=100.200.0.45&ev=0',
    json: true,
    timeout: 5000
  }

  t.deepEqual(request.getCall(0).args[0], expectedGoogleAnalyticsRequestArgs, 'should audit failed lookup with the correct arguments')
  request.resetHistory()
  t.end()
})

test('standardisePostcode() standardises the postcode', (t) => {
  t.equal(standardisePostcode('AB1 1AB'), 'AB11AB', 'should removes space from postcode')
  t.equal(standardisePostcode('AB1      1AB'), 'AB11AB', 'should remove multiple spaces from postcode')
  t.equal(standardisePostcode('   AB1 1AB '), 'AB11AB', 'should remove spaces from around postcode')
  t.equal(standardisePostcode('ab11ab'), 'AB11AB', 'should upper case postcode')
  t.end()
})

test('getAddressLookupResults() calls os places with the correct arguments', async (t) => {
  await getAddressLookupResults(config, 'AB1 1AB')

  const expectedOSPlacesRequestArgs = {
    uri: 'localhost:8150/places/v1/addresses/postcode?postcode=AB11AB&key=123',
    json: true,
    timeout: 5000
  }

  t.deepEqual(request.getCall(0).args[0], expectedOSPlacesRequestArgs, 'should call os places with the correct arguments')

  request.resetHistory()
  t.end()
})

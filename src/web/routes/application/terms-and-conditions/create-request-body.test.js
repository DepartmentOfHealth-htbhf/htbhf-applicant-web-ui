const test = require('tape')
const { createRequestBody } = require('./create-request-body')
const APP_VERSION = 'myAppVersion'

const config = {
  environment: {
    APP_VERSION
  }
}

const requestHeaders = {
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36',
  'x-forwarded-for': '127.0.0.1',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  'another-header': 'foo'
}

const expectedFingerprint = {
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36',
  'ip-address': '127.0.0.1',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
}

test('create claim body', (t) => {
  const claim = {
    _csrf: 'cmm9LYCZ-NU6gvQlx6BVmzJ16i0Q0rutqHXE',
    firstName: 'James',
    lastName: 'The third',
    nino: 'qq123456c',
    'dateOfBirth-day': '01',
    'dateOfBirth-month': '01',
    'dateOfBirth-year': '1920',
    dateOfBirth: '1920-01-01',
    areYouPregnant: 'yes',
    'expectedDeliveryDate-day': '01',
    'expectedDeliveryDate-month': '03',
    'expectedDeliveryDate-year': '2019',
    addressLine1: 'Flat b',
    addressLine2: '221 Baker street',
    townOrCity: 'London',
    postcode: 'aa1 1ab',
    phoneNumber: '07700 900645',
    formattedPhoneNumber: '+447700900645',
    emailAddress: 'test@email.com'
  }

  const request = {
    session: {
      claim
    },
    headers: requestHeaders
  }

  const expectedBody = {
    claimant: {
      firstName: 'James',
      lastName: 'The third',
      nino: 'qq123456c',
      dateOfBirth: '1920-01-01',
      address: {
        addressLine1: 'Flat b',
        addressLine2: '221 Baker street',
        townOrCity: 'London',
        postcode: 'aa1 1ab'
      },
      expectedDeliveryDate: '2019-03-01',
      phoneNumber: '+447700900645', // assert that the phone number posted is the formatted version
      emailAddress: 'test@email.com'
    },
    deviceFingerprint: expectedFingerprint,
    webUIVersion: APP_VERSION
  }

  const bodyToPost = createRequestBody(config, request)

  t.deepEqual(bodyToPost, expectedBody)
  t.end()
})

test('create claim body without expectedDeliveryDate when not pregnant', (t) => {
  const claim = {
    _csrf: 'cmm9LYCZ-NU6gvQlx6BVmzJ16i0Q0rutqHXE',
    firstName: 'James',
    lastName: 'The third',
    nino: 'qq123456c',
    'dateOfBirth-day': '01',
    'dateOfBirth-month': '01',
    'dateOfBirth-year': '1920',
    dateOfBirth: '1920-01-01',
    areYouPregnant: 'no',
    'expectedDeliveryDate-day': '01',
    'expectedDeliveryDate-month': '03',
    'expectedDeliveryDate-year': '2019',
    addressLine1: 'Flat b',
    addressLine2: '221 Baker street',
    townOrCity: 'London',
    postcode: 'aa1 1ab',
    phoneNumber: '07700 900645',
    formattedPhoneNumber: '+447700900645',
    emailAddress: 'test@email.com'
  }

  const request = {
    session: {
      claim
    },
    headers: requestHeaders
  }

  const expectedBody = {
    claimant: {
      firstName: 'James',
      lastName: 'The third',
      nino: 'qq123456c',
      dateOfBirth: '1920-01-01',
      address: {
        addressLine1: 'Flat b',
        addressLine2: '221 Baker street',
        townOrCity: 'London',
        postcode: 'aa1 1ab'
      },
      expectedDeliveryDate: null,
      phoneNumber: '+447700900645', // assert that the phone number posted is the formatted version
      emailAddress: 'test@email.com'
    },
    deviceFingerprint: expectedFingerprint,
    webUIVersion: APP_VERSION
  }

  const bodyToPost = createRequestBody(config, request)

  t.deepEqual(bodyToPost, expectedBody)
  t.end()
})

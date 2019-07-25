const test = require('tape')
const { createRequestBody, createChildrenDobArray } = require('./create-request-body')
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

const CLAIM_WITHOUT_EXPECTED_DELIVERY_DATE = {
  _csrf: 'cmm9LYCZ-NU6gvQlx6BVmzJ16i0Q0rutqHXE',
  firstName: 'James',
  lastName: 'The third',
  nino: 'qq123456c',
  'dateOfBirth-day': '01',
  'dateOfBirth-month': '01',
  'dateOfBirth-year': '1920',
  dateOfBirth: '1920-01-01',
  areYouPregnant: 'no',
  addressLine1: 'Flat b',
  addressLine2: '221 Baker street',
  townOrCity: 'London',
  postcode: 'aa1 1ab',
  phoneNumber: '07700 900645',
  formattedPhoneNumber: '+447700900645',
  emailAddress: 'test@email.com'
}

const CLAIM_WITH_EXPECTED_DELIVERY_DATE = {
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

const CHILDREN = {
  'childName-1': 'First',
  'childDob-1-day': '1',
  'childDob-1-month': '1',
  'childDob-1-year': '2018',
  'childName-2': 'Second',
  'childDob-2-day': '2',
  'childDob-2-month': '2',
  'childDob-2-year': '2017',
  'childDob-1': '2018-01-01',
  'childDob-2': '2017-02-02',
  'inputCount': 2,
  'childCount': 2
}

test('create claim body', (t) => {
  const request = {
    session: {
      claim: CLAIM_WITH_EXPECTED_DELIVERY_DATE,
      children: CHILDREN
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
      emailAddress: 'test@email.com',
      childrenDob: [
        '2018-01-01',
        '2017-02-02'
      ]
    },
    deviceFingerprint: expectedFingerprint,
    webUIVersion: APP_VERSION
  }

  const bodyToPost = createRequestBody(config, request)

  t.deepEqual(bodyToPost, expectedBody)
  t.end()
})

test('create claim body without expectedDeliveryDate when not pregnant', (t) => {
  const request = {
    session: {
      claim: CLAIM_WITHOUT_EXPECTED_DELIVERY_DATE
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
      emailAddress: 'test@email.com',
      childrenDob: null
    },
    deviceFingerprint: expectedFingerprint,
    webUIVersion: APP_VERSION
  }

  const bodyToPost = createRequestBody(config, request)

  t.deepEqual(bodyToPost, expectedBody)
  t.end()
})

test('createChildrenDob extracts childrens dates of birth', (t) => {
  const expectedChildren = ['2018-01-01', '2017-02-02']

  const childrenList = createChildrenDobArray(CHILDREN)

  t.deepEqual(childrenList, expectedChildren)
  t.end()
})

test('createChildrenDob returns null with undefined children object provided', (t) => {
  let children

  const childrenList = createChildrenDobArray(children)

  t.equals(childrenList, null)
  t.end()
})

test('createChildrenDob returns null when children argument is null', (t) => {
  const childrenList = createChildrenDobArray(null)

  t.equals(childrenList, null)
  t.end()
})

test('createChildrenDob throws an error when the childCount is 1 and there is no date of birth in the session.children object', (t) => {
  // This object is invalid because it doesn't have the constructed date for the first child under the key childDob-1
  const invalidConstructedChildren = {
    'childName-1': 'First',
    'childDob-day': '1',
    'childDob-month': '1',
    'childDob-year': '2018',
    'inputCount': 1,
    'childCount': 1
  }

  const childrenList = createChildrenDobArray.bind(null, invalidConstructedChildren)
  t.throws(childrenList, /No child date of birth stored in session for childDob-1/, 'should throw an error when on dob stored for child')
  t.end()
})

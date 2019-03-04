const test = require('tape')
const { createRequestBody } = require('./create-request-body')

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
    postcode: 'aa1 1ab'
  }

  const expectedBody = {
    firstName: 'James',
    lastName: 'The third',
    nino: 'qq123456c',
    dateOfBirth: '1920-01-01',
    cardDeliveryAddress:
      {
        addressLine1: 'Flat b',
        addressLine2: '221 Baker street',
        townOrCity: 'London',
        postcode: 'aa1 1ab'
      },
    expectedDeliveryDate: '2019-03-01'
  }

  const bodyToPost = createRequestBody(claim)

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
    postcode: 'aa1 1ab'
  }

  const expectedBody = {
    firstName: 'James',
    lastName: 'The third',
    nino: 'qq123456c',
    dateOfBirth: '1920-01-01',
    cardDeliveryAddress:
      {
        addressLine1: 'Flat b',
        addressLine2: '221 Baker street',
        townOrCity: 'London',
        postcode: 'aa1 1ab'
      },
    expectedDeliveryDate: null
  }

  const bodyToPost = createRequestBody(claim)

  t.deepEqual(bodyToPost, expectedBody)
  t.end()
})

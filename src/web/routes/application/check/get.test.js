const { NO } = require('../are-you-pregnant/constants')
const test = require('tape')
const {
  buildNameRow,
  buildNinoRow,
  buildDateOfBirthRow,
  buildAreYouPregnantRow,
  buildExpectedDeliveryDateRow,
  buildAddressRow,
  buildCheckRowData
} = require('./get')

const testClaim = {
  _csrf: 'cmm9LYCZ-NU6gvQlx6BVmzJ16i0Q0rutqHXE',
  firstName: 'James',
  lastName: 'The third',
  nino: 'QQ123456C',
  'dateOfBirth-day': '30',
  'dateOfBirth-month': '05',
  'dateOfBirth-year': '1920',
  dateOfBirth: '1920-05-30',
  areYouPregnant: 'yes',
  'expectedDeliveryDate-day': '01',
  'expectedDeliveryDate-month': '03',
  'expectedDeliveryDate-year': '2019',
  addressLine1: 'Flat b',
  addressLine2: '221 Baker street',
  townOrCity: 'London',
  postcode: 'aa1 1ab'
}

test('buildNameRow', (t) => {
  t.deepEqual(buildNameRow(testTranslate, testClaim),
    [
      { text: 'Name' },
      { text: 'James The third' }
    ], 'should match name data')
  t.end()
})

test('buildNinoRow', (t) => {
  t.deepEqual(buildNinoRow(testTranslate, testClaim),
    [
      { text: 'National Insurance Number' },
      { text: 'QQ123456C' }
    ], 'should match national insurance number data')
  t.end()
})

test('buildDateOfBirthRow', (t) => {
  t.deepEqual(buildDateOfBirthRow(testTranslate, testClaim),
    [
      { text: 'Date of Birth' },
      { text: '30 05 1920' }
    ], 'should matcg date of birth data')
  t.end()
})

test('buildAreYouPregnantRow', (t) => {
  t.deepEqual(buildAreYouPregnantRow(testTranslate, testClaim),
    [
      { text: 'Are you pregnant?' },
      { text: 'Yes' }
    ], 'should match are you pregnant row')
  t.end()
})

test('buildExpectedDeliveryDateRowAreYouPregnantYes', (t) => {
  t.deepEqual(buildExpectedDeliveryDateRow(testTranslate, testClaim),
    [
      { text: 'Baby\'s due date' },
      { text: '01 03 2019' }
    ], 'should match expected delivery date')
  t.end()
})

test('buildExpectedDeliveryDateRowAreYouPregnantNo', (t) => {
  const modifiedClaim = Object.assign({}, testClaim)
  modifiedClaim.areYouPregnant = NO
  t.deepEqual(buildExpectedDeliveryDateRow(testTranslate, modifiedClaim), undefined,
    'should not build expected delivery date row if not pregnant')
  t.end()
})

test('buildAddressRowWithAddressLine2', (t) => {
  t.deepEqual(buildAddressRow(testTranslate, testClaim),
    [
      { text: 'Address' },
      { text: 'Flat b<br/>221 Baker street<br/>London<br/>aa1 1ab' }
    ], 'should match address data')
  t.end()
})

test('buildAddressRowWithoutAddressLine2', (t) => {
  const modifiedClaim = Object.assign({}, testClaim)
  modifiedClaim.addressLine2 = ''
  t.deepEqual(buildAddressRow(testTranslate, modifiedClaim),
    [
      { text: 'Address' },
      { text: 'Flat b<br/>London<br/>aa1 1ab' }
    ], 'should match address data')
  t.end()
})

test('buildCheckRowData', (t) => {
  t.deepEqual(buildCheckRowData(testTranslate, testClaim),
    [
      [ { text: 'Name' }, { text: 'James The third' } ],
      [ { text: 'National Insurance Number' }, { text: 'QQ123456C' } ],
      [ { text: 'Date of Birth' }, { text: '30 05 1920' } ],
      [ { text: 'Are you pregnant?' }, { text: 'Yes' } ],
      [ { text: 'Baby\'s due date' }, { text: '01 03 2019' } ],
      [ { text: 'Address' }, { text: 'Flat b<br/>221 Baker street<br/>London<br/>aa1 1ab' } ]
    ], 'should match entire row data')
  t.end()
})

test('buildCheckRowDataWithNoExpectedDate', (t) => {
  const modifiedClaim = Object.assign({}, testClaim)
  modifiedClaim.areYouPregnant = NO
  t.deepEqual(buildCheckRowData(testTranslate, modifiedClaim),
    [
      [ { text: 'Name' }, { text: 'James The third' } ],
      [ { text: 'National Insurance Number' }, { text: 'QQ123456C' } ],
      [ { text: 'Date of Birth' }, { text: '30 05 1920' } ],
      [ { text: 'Are you pregnant?' }, { text: 'No' } ],
      [ { text: 'Address' }, { text: 'Flat b<br/>221 Baker street<br/>London<br/>aa1 1ab' } ]
    ], 'should match entire row data')
  t.end()
})

const testTranslate = (key) => {
  switch (key) {
    case 'check.name':
      return 'Name'
    case 'check.nationalInsuranceNumber':
      return 'National Insurance Number'
    case 'check.dateOfBirth':
      return 'Date of Birth'
    case 'check.areYouPregnant':
      return 'Are you pregnant?'
    case 'check.dueDate':
      return 'Baby\'s due date'
    case 'check.address':
      return 'Address'
    case 'yes':
      return 'Yes'
    case 'no':
      return 'No'
    default:
      throw new Error('Unexpected key to translate: ' + key)
  }
}

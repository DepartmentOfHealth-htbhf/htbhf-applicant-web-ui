const { NO } = require('../are-you-pregnant/constants')
const test = require('tape')
const {
  buildAreYouPregnantRow,
  buildExpectedDeliveryDateRow,
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

test('buildCheckRowData', (t) => {
  t.deepEqual(buildCheckRowData(testTranslate, testClaim),
    [
      [ { text: 'Name' }, { text: 'James The third' } ],
      [ { text: 'National Insurance Number' }, { text: 'QQ123456C' } ],
      [ { text: 'Date of Birth' }, { text: '30 05 1920' } ],
      [ { text: 'Are you pregnant?' }, { text: 'Yes' } ],
      [ { text: 'Baby\'s due date' }, { text: '01 03 2019' } ],
      [ { text: 'Address' }, { text: 'Flat b\n221 Baker street\nLondon\naa1 1ab' } ]
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
      [ { text: 'Address' }, { text: 'Flat b\n221 Baker street\nLondon\naa1 1ab' } ]
    ], 'should match entire row data')
  t.end()
})

const testTranslate = (key) => {
  const testTranslations = {
    'check.name': 'Name',
    'check.nationalInsuranceNumber': 'National Insurance Number',
    'check.dateOfBirth': 'Date of Birth',
    'check.areYouPregnant': 'Are you pregnant?',
    'check.dueDate': 'Baby\'s due date',
    'check.address': 'Address',
    'yes': 'Yes',
    'no': 'No'
  }
  const foundValue = testTranslations[key]
  if (foundValue === undefined) {
    throw new Error('Unexpected key to translate: ' + key)
  }
  return foundValue
}

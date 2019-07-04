const test = require('tape')
const { dateAsString } = require('../common/formatters')
const {
  fieldExistsWithPrefix,
  buildDateStringForPrefix,
  convertDateFieldsToDateStrings,
  isChildNameKey,
  getChildrenNameKeys,
  validateDateOfBirth
} = require('./validate')

const fields = {
  'childName-1': 'Lisa',
  'childDob-1-day': '1',
  'childDob-1-month': '2',
  'childDob-1-year': '2001',
  'childName-2': 'Bart',
  'childDob-2-day': '3',
  'childDob-2-month': '4',
  'childDob-2-year': '2002',
  'childName-3': 'Maggie',
  'childDob-3-day': '5',
  'childDob-3-month': '6',
  'childDob-3-year': '2003'
}

const req = {
  t: (string) => string
}

test('fieldExistsWithPrefix() returns true if field exists starting with prefix', (t) => {
  const result = fieldExistsWithPrefix('childDob-2')(fields)
  t.equal(result, true, 'returns true if field exists starting with prefix')
  t.end()
})

test('fieldExistsWithPrefix() returns false if field does not exist starting with prefix', (t) => {
  const result = fieldExistsWithPrefix('childDob-4')(fields)
  t.equal(result, false, 'returns false if field does not exist starting with prefix')
  t.end()
})

test('buildDateStringForPrefix() returns correct date string for prefix', (t) => {
  const result = buildDateStringForPrefix('childDob-2', fields)
  const expected = '2002-04-03'
  t.equal(result, expected, 'returns correct date string for prefix')
  t.end()
})

test('convertDateFieldsToDateStrings() converts individual date fields to composite date string', (t) => {
  const result = convertDateFieldsToDateStrings(fields)

  const expected = {
    'childDob-1': '2001-02-01',
    'childDob-2': '2002-04-03',
    'childDob-3': '2003-06-05'
  }

  t.deepEqual(result, expected, 'converts individual date fields to composite date string')
  t.end()
})

test('isChildNameKey() returns true if key contains child name prefix', (t) => {
  const result = isChildNameKey(undefined, 'childName-')
  t.equal(result, true, 'returns true if key contains child name prefix')
  t.end()
})

test('isChildNameKey() returns false if key does not contain child name prefix', (t) => {
  const result = isChildNameKey(undefined, 'notAChildName-')
  t.equal(result, false, 'returns false if key does not contain child name prefix')
  t.end()
})

test('getChildrenNameKeys() returns an array of keys for children names', (t) => {
  const result = getChildrenNameKeys(fields)
  const expected = ['childName-1', 'childName-2', 'childName-3']

  t.deepEqual(result, expected, 'returns an array of keys for children names')
  t.end()
})

test('validateDateOfBirth() throws an error for an invalid date of birth', (t) => {
  const result = validateDateOfBirth.bind(null, 'invalid-date-2019', { req })
  t.throws(result, /validation:childDateOfBirthInvalid/, 'throws an error for an invalid date of birth')
  t.end()
})

test('validateDateOfBirth() throws an error for a date of birth more than four years in the past', (t) => {
  const result = validateDateOfBirth.bind(null, '2003-06-05', { req })
  t.throws(result, /validation:childDateOfBirthFourYearsOrOlder/, 'throws an error for a date of birth more than four years in the past')
  t.end()
})

test('validateDateOfBirth() returns true for a valid date less than four years in the past', (t) => {
  const dob = dateAsString({ yearAdjustment: -2 })
  const result = validateDateOfBirth(dob, { req })
  t.equal(result, true, 'returns true for a valid date less than four years in the past')
  t.end()
})

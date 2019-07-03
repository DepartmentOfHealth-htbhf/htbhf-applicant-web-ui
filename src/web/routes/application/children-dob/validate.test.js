const test = require('tape')
const { fieldExistsWithPrefix, buildDateStringForPrefix, convertDateFieldsToDateStrings } = require('./validate')

const fields = {
  'childDob-1-day': '1',
  'childDob-1-month': '2',
  'childDob-1-year': '2001',
  'childDob-2-day': '3',
  'childDob-2-month': '4',
  'childDob-2-year': '2002',
  'childDob-3-day': '5',
  'childDob-3-month': '6',
  'childDob-3-year': '2003'
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

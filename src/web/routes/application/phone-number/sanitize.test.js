const test = require('tape')
const { getPhoneNumber } = require('./sanitize')

test('getPhoneNumber converts leading zero', (t) => {
  const phoneNumber = '07700900645'
  const expected = '+447700900645'

  const result = getPhoneNumber(phoneNumber)

  t.deepEqual(result.number, expected, 'it should display the number in +44 format')
  t.end()
})

test('getPhoneNumber converts no leading zero or +44', (t) => {
  const phoneNumber = '7700900645'
  const expected = '+447700900645'

  const result = getPhoneNumber(phoneNumber)

  t.deepEqual(result.number, expected, 'it should display the number in +44 format')
  t.end()
})

test('getPhoneNumber doesn\'t convert leading +44', (t) => {
  const phoneNumber = '+447700900645'
  const expected = '+447700900645'

  const result = getPhoneNumber(phoneNumber)

  t.deepEqual(result.number, expected, 'it should display the number in +44 format')
  t.end()
})

test('getPhoneNumber converts and removes spaces', (t) => {
  const phoneNumber = '07700 900645 '
  const expected = '+447700900645'

  const result = getPhoneNumber(phoneNumber)

  t.deepEqual(result.number, expected, 'it should display the number in +44 format and remove spaces')
  t.end()
})

test('getPhoneNumber converts and removes hyphens', (t) => {
  const phoneNumber = '07700-900-645'
  const expected = '+447700900645'

  const result = getPhoneNumber(phoneNumber)

  t.deepEqual(result.number, expected, 'it should display the number in +44 format and remove hyphens')
  t.end()
})

test('getPhoneNumber converts and removes brackets', (t) => {
  const phoneNumber = '(07700)900645'
  const expected = '+447700900645'

  const result = getPhoneNumber(phoneNumber)

  t.deepEqual(result.number, expected, 'it should display the number in +44 format and remove hyphens')
  t.end()
})

test('getPhoneNumber returns undefined for invalid number format', (t) => {
  const phoneNumber = '+07700 900645 '
  const expected = undefined

  const result = getPhoneNumber(phoneNumber)

  t.deepEqual(result, expected, 'it should be undefined')
  t.end()
})

test('getPhoneNumber returns undefined for empty string', (t) => {
  const phoneNumber = ''
  const expected = undefined

  const result = getPhoneNumber(phoneNumber)

  t.deepEqual(result, expected, 'it should be undefined')
  t.end()
})

test('getPhoneNumber returns undefined for null', (t) => {
  const phoneNumber = null
  const expected = undefined

  const result = getPhoneNumber(phoneNumber)

  t.deepEqual(result, expected, 'it should be undefined')
  t.end()
})

test('getPhoneNumber returns undefined for undefined', (t) => {
  const phoneNumber = undefined
  const expected = undefined

  const result = getPhoneNumber(phoneNumber)

  t.deepEqual(result, expected, 'it should be undefined')
  t.end()
})

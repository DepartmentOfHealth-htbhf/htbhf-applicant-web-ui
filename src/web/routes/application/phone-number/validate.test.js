const test = require('tape')
const { getPhoneNumber } = require('./sanitize')
const { validatePhoneNumber } = require('./validate')

test('invalid phone number - too short', (t) => {
  const invalidPhoneNumber = getPhoneNumber('0712345678')

  const result = validatePhoneNumber(invalidPhoneNumber)

  t.equal(result, false, 'it should be false')
  t.end()
})

test('invalid phone number - too long', (t) => {
  const invalidPhoneNumber = getPhoneNumber('071234567890')

  const result = validatePhoneNumber(invalidPhoneNumber)

  t.equal(result, false, 'it should be false')
  t.end()
})

test('invalid phone number - not valid uk number', (t) => {
  // ofcom test numbers (07700 900431) are not valid phone numbers
  const invalidPhoneNumber = getPhoneNumber('07700 900431')

  const result = validatePhoneNumber(invalidPhoneNumber)

  t.equal(result, false, 'it should be false')
  t.end()
})

test('valid phone number', (t) => {
  // can not use one of ofcom's list of test numbers as these aren't valid phone numbers.
  // 07123456789 however is valid, unused and one of the numbers used to test libphonenumber
  const validPhoneNumber = getPhoneNumber('07123456789')

  const result = validatePhoneNumber(validPhoneNumber)

  t.equal(result, true, 'it should be true')
  t.end()
})

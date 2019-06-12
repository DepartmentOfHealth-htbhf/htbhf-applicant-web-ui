const test = require('tape')
const { validatePhoneNumber } = require('./validate')

const req = {
  t: (string) => string
}

test('missing phone number - empty string', (t) => {
  const invalidPhoneNumber = ''

  t.throws(validatePhoneNumber.bind(null, invalidPhoneNumber, { req }), /validation:missingPhoneNumber/, 'should throw an error for missing number')
  t.end()
})

test('invalid phone number - too short for mobile', (t) => {
  // 07 numbers are always 11 digits
  const invalidPhoneNumber = '0712345678'

  t.throws(validatePhoneNumber.bind(null, invalidPhoneNumber, { req }), /validation:phoneNumberInvalid/, 'should throw an error for invalid number')
  t.end()
})

test('invalid phone number - too long', (t) => {
  const invalidPhoneNumber = '071234567890'

  t.throws(validatePhoneNumber.bind(null, invalidPhoneNumber, { req }), /validation:phoneNumberInvalid/, 'should throw an error for invalid number')
  t.end()
})

test('invalid phone number - not valid uk number', (t) => {
  // ofcom test numbers (07700 900431) are not valid phone numbers
  const invalidPhoneNumber = '07700 900431'

  t.throws(validatePhoneNumber.bind(null, invalidPhoneNumber, { req }), /validation:phoneNumberInvalid/, 'should throw an error for invalid number')
  t.end()
})

test('invalid phone number - non uk area area code', (t) => {
  const invalidPhoneNumber = '+0017123456789'

  t.throws(validatePhoneNumber.bind(null, invalidPhoneNumber, { req }), /validation:phoneNumberInvalid/, 'should throw an error for invalid number')
  t.end()
})

test('invalid phone number - uk area code with out leading +', (t) => {
  const invalidPhoneNumber = '4417123456789'

  t.throws(validatePhoneNumber.bind(null, invalidPhoneNumber, { req }), /validation:phoneNumberInvalid/, 'should throw an error for invalid number')
  t.end()
})

test('valid phone number - +44 format', (t) => {
  const validPhoneNumber = '+447123456789'

  const result = validatePhoneNumber(validPhoneNumber, { req })

  t.equal(result, true, 'it should be true')
  t.end()
})

test('valid phone number - no leading 0 digit', (t) => {
  const validPhoneNumber = '7123456789'

  const result = validatePhoneNumber(validPhoneNumber, { req })

  t.equal(result, true, 'it should be true')
  t.end()
})

test('valid phone number - spaces', (t) => {
  const validPhoneNumber = '07123 456789'

  const result = validatePhoneNumber(validPhoneNumber, { req })

  t.equal(result, true, 'it should be true')
  t.end()
})

test('valid phone number - leading 0 digit', (t) => {
  const validPhoneNumber = '07123456789'

  const result = validatePhoneNumber(validPhoneNumber, { req })

  t.equal(result, true, 'it should be true')
  t.end()
})

test('valid phone number - hyphens', (t) => {
  const validPhoneNumber = '07123-456789'

  const result = validatePhoneNumber(validPhoneNumber, { req })

  t.equal(result, true, 'it should be true')
  t.end()
})

test('valid phone number - braces', (t) => {
  const validPhoneNumber = '(07123)(456789)'

  const result = validatePhoneNumber(validPhoneNumber, { req })

  t.equal(result, true, 'it should be true')
  t.end()
})

test('valid phone number - leading 0044', (t) => {
  const validPhoneNumber = '00447123456789'

  const result = validatePhoneNumber(validPhoneNumber, { req })

  t.equal(result, true, 'it should be true')
  t.end()
})

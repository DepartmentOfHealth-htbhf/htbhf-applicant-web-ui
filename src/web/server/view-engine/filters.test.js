const test = require('tape')
const { toErrorList, getErrorForField, camelToKebabCase } = require('./filters')

const firstNameTooLong = 'First name is too long'
const missingLastName = 'Missing last name'

const errors = [
  {
    param: 'firstName',
    msg: firstNameTooLong
  },
  {
    param: 'lastName',
    msg: missingLastName
  }
]

test('toErrorList', (t) => {
  const expected = [
    {
      text: firstNameTooLong,
      href: '#first-name-error'
    },
    {
      text: missingLastName,
      href: '#last-name-error'
    }
  ]

  const errorList = toErrorList(errors)

  t.deepEqual(errorList, expected, 'Error object is converted to array')
  t.end()
})

test('getErrorForField', (t) => {
  const result = getErrorForField(errors, 'middleName')
  t.equal(result, null, 'it should return null if matching error is not found')
  t.end()
})

test('getErrorForField', (t) => {
  const result = getErrorForField(errors, 'lastName')

  const expected = {
    text: missingLastName
  }

  t.deepEqual(result, expected, 'it should return an error if matching error is found')
  t.end()
})

test('getErrorForField', (t) => {
  const result = getErrorForField(undefined, 'lastName')
  t.deepEqual(result, null, 'it should return null when errors are undefined')
  t.end()
})

test('camelToKebabCase', (t) => {
  const result = camelToKebabCase('personsFirstName')
  t.deepEqual(result, 'persons-first-name', 'it should convert camelcase to kebab case')
  t.end()
})

test('camelToKebabCase ending in a number', (t) => {
  const result = camelToKebabCase('addressLine1')
  t.deepEqual(result, 'address-line-1', 'it should convert camelcase to kebab case including the number')
  t.end()
})

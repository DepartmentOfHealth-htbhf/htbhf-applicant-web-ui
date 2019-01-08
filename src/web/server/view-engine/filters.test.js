const test = require('tape')
const { toErrorList, getErrorForField } = require('./filters')

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
      href: '#firstName-error'
    },
    {
      text: missingLastName,
      href: '#lastName-error'
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

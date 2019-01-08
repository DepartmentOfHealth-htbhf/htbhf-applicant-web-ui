const test = require('tape')
const { toErrorList } = require('./filters')

test('Error object is converted to array', (t) => {
  const missingLastName = 'Missing last name'
  const firstNameTooLong = 'First name is too long'
  const errors = {
    firstName: {
      text: firstNameTooLong
    },
    lastName: {
      text: missingLastName
    }
  }
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

  t.deepEqual(errorList, expected)

  t.end()
})

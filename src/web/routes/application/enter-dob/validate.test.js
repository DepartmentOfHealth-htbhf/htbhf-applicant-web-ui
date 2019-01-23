const test = require('tape')
const { validateDateOfBirth } = require('./validate')

test('validateDateOfBirth()', (t) => {
  const req = {
    t: (string) => string
  }

  t.equal(validateDateOfBirth('1980-03-31', { req }), true, 'should return true for a valid date')
  t.throws(validateDateOfBirth.bind(null, null, { req }), /validation:dateOfBirthInvalid/, 'should throw an error for a null date')
  t.throws(validateDateOfBirth.bind(null, 'invalid', { req }), /validation:dateOfBirthInvalid/, 'should throw an error for "invalid"')
  t.throws(validateDateOfBirth.bind(null, '2009-02-29', { req }), /validation:dateOfBirthInvalid/, 'should throw an error for "2009-02-29"')
  t.throws(validateDateOfBirth.bind(null, '2199-01-01', { req }), /validation:dateOfBirthInPast/, 'should throw an error for "2199-01-01"')
  t.end()
})

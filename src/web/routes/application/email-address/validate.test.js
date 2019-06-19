const test = require('tape')

const { EMAIL_ADDRESS_REGEX } = require('./validate')

test('valid email', (t) => {
  const emailAddresses = [
    'email@domain.com',
    'firstname.lastname@domain.com',
    'email@subdomain.domain.com',
    'firstname+lastname@domain.com',
    '1234567890@domain.com',
    'email@domain-one.com',
    '_______@domain.com',
    'email@domain.name',
    'email@domain.co.jp',
    'firstname-lastname@domain.com',
    'Pälé@example.com']

  emailAddresses.forEach(emailAddress => {
    const matches = EMAIL_ADDRESS_REGEX.test(emailAddress)
    t.equal(matches, true)
  })

  t.end()
})

test('invalid email', (t) => {
  const emailAddresses = [
    '',
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@domain.com',
    'Joe Smith <email@domain.com>',
    'email.domain.com',
    'email@domain@domain.com',
    '.email@domain.com',
    'email.@domain.com',
    'email..email@domain.com',
    'email@domain.com (Joe Smith)',
    'email@domain',
    'email@domain..com'
  ]

  emailAddresses.forEach(emailAddress => {
    console.log(emailAddress)
    const matches = EMAIL_ADDRESS_REGEX.test(emailAddress)
    t.equal(matches, false)
  })

  t.end()
})

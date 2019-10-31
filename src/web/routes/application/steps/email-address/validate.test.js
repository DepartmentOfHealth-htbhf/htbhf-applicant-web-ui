const test = require('tape')
const Promise = require('bluebird')
const { applyExpressValidation } = require('../common/test/apply-express-validation')
const { validate } = require('./validate')

const MAX_EMAIL_ADDRESS_LENGTH = 256

test('validation fails for long email addresses', async (t) => {
  const domain = '@domain.com'
  const emailAddressWithLongPrefix = `${'a'.repeat(MAX_EMAIL_ADDRESS_LENGTH - domain.length)}${domain}`

  const prefix = 'name'
  const suffix = '.com'
  const EmailAddressWithLongDomain = `${prefix}@${'a'.repeat(MAX_EMAIL_ADDRESS_LENGTH - (prefix.length + suffix.length))}.com`

  const emailAddresses = [emailAddressWithLongPrefix, EmailAddressWithLongDomain]

  Promise.each(emailAddresses, async emailAddress => {
    const req = {
      body: {
        emailAddress
      }
    }

    const result = await applyExpressValidation(req, validate())
    const error = result.array()[0]
    t.equal(result.array().length, 1, 'contains exactly one error')
    t.equal(error.param, 'emailAddress', 'error is associated with correct field')
    t.equal(error.msg, 'validation:invalidEmail', 'error has correct message')
  })

  t.end()
})

test('validation middleware passes with valid email address', async (t) => {
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
    'Pälé@example.com'
  ]

  Promise.each(emailAddresses, async emailAddress => {
    const req = {
      body: {
        emailAddress
      }
    }

    const result = await applyExpressValidation(req, validate())
    t.equal(result.isEmpty(), true)
  })

  t.end()
})

test('validation middleware fails with invalid email address', async (t) => {
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

  Promise.each(emailAddresses, async emailAddress => {
    const req = {
      body: {
        emailAddress
      }
    }

    const result = await applyExpressValidation(req, validate())
    const error = result.array()[0]
    t.equal(result.array().length, 1, 'contains exactly one error')
    t.equal(error.param, 'emailAddress', 'error is associated with correct field')
    t.equal(error.msg, 'validation:invalidEmail', 'error has correct message')
  })

  t.end()
})

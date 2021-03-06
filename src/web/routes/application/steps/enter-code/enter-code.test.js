const test = require('tape')

const { TEXT, EMAIL } = require('../common/constants')
const { getConfirmationCodeDestination } = require('./enter-code')

test('getPhoneNumberForConfirmationCode', (t) => {
  const claim = {
    channelForCode: TEXT,
    phoneNumber: '07123456789',
    emailAddress: 'test@email.dom'
  }

  const confirmationCodeDestination = getConfirmationCodeDestination(claim)
  t.equal(confirmationCodeDestination, claim.phoneNumber)
  t.end()
})

test('getEmailAddressForConfirmationCode', (t) => {
  const claim = {
    channelForCode: EMAIL,
    phoneNumber: '07123456789',
    emailAddress: 'test@email.dom'
  }

  const confirmationCodeDestination = getConfirmationCodeDestination(claim)
  t.equal(confirmationCodeDestination, claim.emailAddress)
  t.end()
})

test('throwExceptionWhenNeitherTextOrEmailSelected', (t) => {
  const claim = {
    phoneNumber: '07123456789',
    emailAddress: 'test@email.dom'
  }

  t.throws(
    getConfirmationCodeDestination.bind(null, claim),
    /Expecting 'channelForCode' option to be either 'text' or 'email', instead was undefined/,
    `No 'channelForCode' option on the claim should throw an error`)
  t.end()
})

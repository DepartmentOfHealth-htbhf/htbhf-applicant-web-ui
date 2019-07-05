const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const { TEXT, EMAIL } = require('../common/constants')

const sendSms = sinon.spy()
const sendEmail = sinon.spy()

class NotifyClient {
  sendSms (templateId, phoneNumber, options) { sendSms(templateId, phoneNumber, options) }

  sendEmail (templateId, emailAddress, options) { sendEmail(templateId, emailAddress, options) }
}

const { sendConfirmationCode, SMS_TEMPLATE_ID, EMAIL_TEMPLATE_ID } = proxyquire('./notify', { 'notifications-node-client': { NotifyClient } })

test('sendCodeToSMS', (t) => {
  const claim = {
    phoneNumber: '07123456789',
    emailAddress: 'test@email.com'
  }
  const channelForCode = TEXT
  const confirmationCode = '123456'

  sendConfirmationCode(claim, channelForCode, confirmationCode)

  t.equal(sendSms.getCall(0).args[0], SMS_TEMPLATE_ID)
  t.equal(sendSms.getCall(0).args[1], claim.phoneNumber)
  t.equal(sendSms.getCall(0).args[2].personalisation.confirmationCode, confirmationCode)
  t.end()
})

test('sendCodeToEmail', (t) => {
  const claim = {
    phoneNumber: '07123456789',
    emailAddress: 'test@email.com'
  }
  const channelForCode = EMAIL
  const confirmationCode = '123456'

  sendConfirmationCode(claim, channelForCode, confirmationCode)

  t.equal(sendEmail.getCall(0).args[0], EMAIL_TEMPLATE_ID)
  t.equal(sendEmail.getCall(0).args[1], claim.emailAddress)
  t.equal(sendEmail.getCall(0).args[2].personalisation.confirmationCode, confirmationCode)
  t.end()
})

test('throwErrorWhenChannelForCodeNotEmailOrText', (t) => {
  const claim = {
    phoneNumber: '07123456789',
    emailAddress: 'test@email.com'
  }
  const channelForCode = 'other'
  const confirmationCode = '123456'

  t.throws(sendConfirmationCode.bind(null, claim, channelForCode, confirmationCode), /Expecting 'channelForCode' option to be either 'text' or 'email', instead was other/)
  t.end()
})

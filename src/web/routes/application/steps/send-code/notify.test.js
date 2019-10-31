const test = require('tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const { TEXT, EMAIL } = require('../common/constants')

const ERROR_PHONE_NUMBER = '09999999999'
const ERROR_EMAIL = 'error@mail.com'
const ERROR_MESSAGE = 'failure to notify'

const sendSms = sinon.spy()
const sendEmail = sinon.spy()
const info = sinon.spy()
const error = sinon.spy()

class NotifyClient {
  sendSms (templateId, phoneNumber, options) {
    if (phoneNumber === ERROR_PHONE_NUMBER) {
      return Promise.reject(new Error(ERROR_MESSAGE))
    }
    sendSms(templateId, phoneNumber, options)
    return Promise.resolve()
  }

  sendEmail (templateId, emailAddress, options) {
    if (emailAddress === ERROR_EMAIL) {
      return Promise.reject(new Error(ERROR_MESSAGE))
    }
    sendEmail(templateId, emailAddress, options)
    return Promise.resolve()
  }
}

const logger = { info, error }

const { sendConfirmationCode, SMS_TEMPLATE_ID, EMAIL_TEMPLATE_ID } = proxyquire('./notify', {
  'notifications-node-client': { NotifyClient },
  '../../../../logger': { logger }
})

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

test('sendConfirmationCode to SMS logs error', async (t) => {
  const claim = {
    phoneNumber: ERROR_PHONE_NUMBER,
    emailAddress: 'test@email.com'
  }
  const channelForCode = TEXT
  const confirmationCode = '123456'

  await sendConfirmationCode(claim, channelForCode, confirmationCode)
  const errorLog = error.getCall(0).args[0]
  const errorObj = JSON.parse(errorLog)

  t.equal(errorObj.eventType, 'FAILURE')
  t.equal(errorObj.failedEvent, 'SEND_2FA_CODE')
  t.equal(errorObj.exceptionDetail, ERROR_MESSAGE)
  t.end()
})

test('sendConfirmationCode to email logs error', async (t) => {
  const claim = {
    phoneNumber: '07123456789',
    emailAddress: ERROR_EMAIL
  }
  const channelForCode = EMAIL
  const confirmationCode = '123456'

  await sendConfirmationCode(claim, channelForCode, confirmationCode)
  const errorLog = error.getCall(0).args[0]
  const errorObj = JSON.parse(errorLog)

  t.equal(errorObj.eventType, 'FAILURE')
  t.equal(errorObj.failedEvent, 'SEND_2FA_CODE')
  t.equal(errorObj.exceptionDetail, ERROR_MESSAGE)
  t.end()
})

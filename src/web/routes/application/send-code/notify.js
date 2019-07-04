const { NotifyClient } = require('notifications-node-client')
const uuid = require('uuid/v4')
const config = require('../../../../config')
const notifyClient = new NotifyClient(config.environment.NOTIFY_API_KEY)
require('dotenv').config()

const { EMAIL, TEXT } = require('../common/constants')

const EMAIL_TEMPLATE_ID = '18cf4f69-e1b5-4aa9-bed7-c906d3a59285'
const SMS_TEMPLATE_ID = 'a770479a-097c-4079-acc2-d452a6f21585'

function sendConfirmationCode (claim, channelForCode, confirmationCode) {
  const notifyOptions = { personalisation: { confirmationCode }, reference: uuid() }

  if (channelForCode === EMAIL) {
    console.log(`Send email to ${claim.emailAddress}`)
    notifyClient.sendEmail(EMAIL_TEMPLATE_ID, claim.emailAddress, notifyOptions)
  } else if (channelForCode === TEXT) {
    notifyClient.sendSms(SMS_TEMPLATE_ID, claim.phoneNumber, notifyOptions)
  } else {
    throw new Error(`Expecting 'channelForCode' option to be either 'text' or 'email', instead was ${channelForCode}`)
  }
}

module.exports = {
  sendConfirmationCode,
  SMS_TEMPLATE_ID,
  EMAIL_TEMPLATE_ID
}

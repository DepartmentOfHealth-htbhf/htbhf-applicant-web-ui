const { NotifyClient } = require('notifications-node-client')
const uuid = require('uuidv4')
const config = require('../../../../config')
const notifyClient = new NotifyClient(config.environment.NOTIFY_API_KEY)
const { logger } = require('../../../logger')
require('dotenv').config()

const { EMAIL, TEXT } = require('../common/constants')

// template ids matching the templates in govuk notify.
const EMAIL_TEMPLATE_ID = '18cf4f69-e1b5-4aa9-bed7-c906d3a59285'
const SMS_TEMPLATE_ID = 'a770479a-097c-4079-acc2-d452a6f21585'

function sendConfirmationCode (claim, channel, code) {
  // notify requires a unique reference for each request
  const reference = uuid()
  const notifyOptions = { personalisation: { confirmationCode: code }, reference: reference }

  if (channel === EMAIL) {
    logger.info(`Sending email with reference ${reference}`)
    notifyClient.sendEmail(EMAIL_TEMPLATE_ID, claim.emailAddress, notifyOptions)
  } else if (channel === TEXT) {
    logger.info(`Sending sms with reference ${reference}`)
    notifyClient.sendSms(SMS_TEMPLATE_ID, claim.phoneNumber, notifyOptions)
  } else {
    throw new Error(`Expecting 'channelForCode' option to be either 'text' or 'email', instead was ${channel}`)
  }
}

module.exports = {
  sendConfirmationCode,
  SMS_TEMPLATE_ID,
  EMAIL_TEMPLATE_ID
}

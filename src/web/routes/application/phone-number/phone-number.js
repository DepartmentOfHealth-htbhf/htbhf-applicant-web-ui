const { validate } = require('./validate')
const { sanitize } = require('./sanitize')
const { TEXT } = require('../common/constants')
const { handleConfirmationCodeReset, getConfirmationCodeChannel } = require('../common/confirmation-code')

const pageContent = ({ translate }) => ({
  title: translate('phoneNumber.title'),
  heading: translate('phoneNumber.heading'),
  formDescription: translate('phoneNumber.formDescription'),
  phoneNumberLabel: translate('phoneNumber.phoneNumberLabel'),
  buttonText: translate('buttons:continue'),
  explanation: translate('phoneNumber.explanation')
})

const contentSummary = (req) => ({
  key: req.t('phoneNumber.summaryKey'),
  value: `${req.session.claim.phoneNumber}`.trim()
})

const phoneNumberHasBeenUpdated = req => req.body.phoneNumber !== req.session.claim.phoneNumber

const confirmationChannelIsText = req => getConfirmationCodeChannel(req) === TEXT

const behaviourForPost = () => (req, res, next) => {
  if (confirmationChannelIsText(req) && phoneNumberHasBeenUpdated(req)) {
    handleConfirmationCodeReset(req)
  }

  next()
}

const phoneNumber = {
  path: '/phone-number',
  template: 'phone-number',
  validate,
  sanitize,
  pageContent,
  contentSummary,
  behaviourForPost
}

module.exports = {
  contentSummary,
  phoneNumber,
  behaviourForPost
}

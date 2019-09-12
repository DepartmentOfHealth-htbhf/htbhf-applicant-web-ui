const { validate } = require('./validate')
const { getConfirmationCodeChannel, handleConfirmationCodeReset } = require('../common/confirmation-code')
const { EMAIL } = require('../common/constants')

const pageContent = ({ translate }) => ({
  title: translate('emailAddress.title'),
  heading: translate('emailAddress.heading'),
  formDescription: translate('emailAddress.formDescription'),
  emailAddressLabel: translate('emailAddress.emailAddressLabel'),
  buttonText: translate('buttons:continue'),
  explanation: translate('emailAddress.explanation')
})

const contentSummary = (req) => ({
  key: req.t('emailAddress.summaryKey'),
  value: req.session.claim.emailAddress.trim()
})

const emailAddressHasBeenUpdated = req => req.body.emailAddress !== req.session.claim.emailAddress

const confirmationChannelIsEmail = req => getConfirmationCodeChannel(req) === EMAIL

const behaviourForPost = () => (req, res, next) => {
  if (confirmationChannelIsEmail(req) && emailAddressHasBeenUpdated(req)) {
    handleConfirmationCodeReset(req)
  }

  next()
}

const requestBody = (session) => ({
  emailAddress: session.claim.emailAddress
})

const emailAddress = {
  path: '/email-address',
  template: 'email-address',
  validate,
  pageContent,
  contentSummary,
  behaviourForPost,
  requestBody
}

module.exports = {
  contentSummary,
  emailAddress,
  behaviourForPost,
  requestBody
}

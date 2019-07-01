const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('emailAddress.title'),
  heading: translate('emailAddress.heading'),
  hint: translate('emailAddress.hint'),
  emailAddressLabel: translate('emailAddress.emailAddressLabel'),
  buttonText: translate('buttons:continue'),
  explanation: translate('emailAddress.explanation')
})

const contentSummary = (req) => ({
  key: req.t('emailAddress.summaryKey'),
  value: req.session.claim.emailAddress.trim()
})

const emailAddress = {
  path: '/email-address',
  next: () => '/choose-channel-for-code',
  template: 'email-address',
  validate,
  pageContent,
  contentSummary
}

module.exports = {
  contentSummary,
  emailAddress
}

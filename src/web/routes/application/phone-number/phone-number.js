const { validate } = require('./validate')
const { sanitize } = require('./sanitize')

const pageContent = ({ translate }) => ({
  title: translate('phoneNumber.title'),
  heading: translate('phoneNumber.heading'),
  hint: translate('phoneNumber.hint'),
  phoneNumberLabel: translate('phoneNumber.phoneNumberLabel'),
  buttonText: translate('buttons:continue'),
  explanation: translate('phoneNumber.explanation')
})

const contentSummary = (req) => ({
  key: req.t('phoneNumber.summaryKey'),
  value: `${req.session.claim.phoneNumber}`.trim()
})

const phoneNumber = {
  path: '/phone-number',
  next: () => '/email-address',
  template: 'phone-number',
  validate,
  sanitize,
  pageContent,
  contentSummary
}

module.exports = {
  contentSummary,
  phoneNumber
}

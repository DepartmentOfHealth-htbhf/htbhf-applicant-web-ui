const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('emailAddress.title'),
  heading: translate('emailAddress.heading'),
  formDescription: translate('emailAddress.formDescription'),
  emailAddressLabel: translate('emailAddress.emailAddressLabel'),
  buttonText: translate('buttons:continue'),
  detail: {
    summaryText: translate('whyDoWeNeedThis'),
    text: translate('emailAddress.detail.text')
  }
})

const contentSummary = (req) => ({
  key: req.t('emailAddress.summaryKey'),
  value: req.session.claim.emailAddress.trim()
})

const emailAddress = {
  path: '/email-address',
  next: () => '/check',
  template: 'email-address',
  validate,
  pageContent,
  contentSummary
}

module.exports = {
  contentSummary,
  emailAddress
}

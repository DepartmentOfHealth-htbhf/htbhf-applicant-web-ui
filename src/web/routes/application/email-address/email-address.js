// TODO DW HTBHF-1612 add validation

const pageContent = ({ translate }) => ({
  title: translate('emailAddress.title'),
  heading: translate('emailAddress.heading'),
  formDescription: translate('emailAddress.formDescription'),
  emailAddressLabel: translate('emailAddress.phoneNumberLabel'),
  buttonText: translate('buttons:continue'),
  detail: {
    summaryText: translate('whyDoWeNeedThis'),
    text: translate('emailAddress.detail.text')
  }
})

const contentSummary = (req) => ({
  key: req.t('emailAddress.summaryKey'),
  value: `${req.session.claim.emailAddress}`.trim()
})

const emailAddress = {
  path: '/email-address',
  next: () => '/check',
  template: 'email-address',
  pageContent,
  contentSummary
}

module.exports = {
  contentSummary,
  emailAddress
}

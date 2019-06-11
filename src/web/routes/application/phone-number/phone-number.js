// TODO DW HTBHF-1544 add in phone number validation and sanitization

const pageContent = ({ translate }) => ({
  title: translate('phoneNumber.title'),
  heading: translate('phoneNumber.heading'),
  formDescription: translate('phoneNumber.formDescription'),
  phoneNumberLabel: translate('phoneNumber.phoneNumberLabel'),
  buttonText: translate('buttons:continue')
})

const contentSummary = (req) => ({
  key: req.t('phoneNumber.summaryKey'),
  value: `${req.session.claim.phoneNumber}`.trim()
})

const phoneNumber = {
  path: '/phone-number',
  next: '/check',
  template: 'phone-number',
  pageContent,
  contentSummary
}

module.exports = {
  contentSummary,
  phoneNumber
}

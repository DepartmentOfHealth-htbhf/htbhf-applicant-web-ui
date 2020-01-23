const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('nhsNumber.title'),
  heading: translate('nhsNumber.heading'),
  nhsNumberLabel: translate('nhsNumber.nhsNumberLabel'),
  nhsNumberhint: translate('nhsNumber.nhsNumberhint'),
  buttonText: translate('buttons:continue'),
  explanation: translate('nhsNumber.explanation')
})

const contentSummary = (req) => ({
  key: req.t('name.summaryKey'),
  value: `${req.session.claim.nhsNumber}`
})

const requestBody = (session) => ({
  nhsNumber: session.claim.nhsNumber
})

const nhsNumber = {
  path: '/nhs-number',
  template: 'nhs-number',
  validate,
  pageContent,
  contentSummary,
  requestBody
}

module.exports = {
  contentSummary,
  requestBody,
  nhsNumber
}

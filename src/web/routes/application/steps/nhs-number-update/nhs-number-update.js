const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('nhsNumberUpdate.title'),
  heading: translate('nhsNumberUpdate.heading'),
  nhsNumberUpdateLabel: translate('nhsNumberUpdate.nhsNumberUpdateLabel'),
  nhsNumberUpdateHint: translate('nhsNumberUpdate.nhsNumberUpdatehint'),
  buttonText: translate('buttons:continue')
})

const contentSummary = (req) => ({
  key: req.t('nhsNumberUpdate.summaryKey'),
  value: `${req.session.claim.nhsNumberUpdate}`
})

const requestBody = (session) => ({
  nhsNumberUpdate: session.claim.nhsNumberUpdate
})

const nhsNumberUpdate = {
  path: '/nhs-number-update',
  template: 'nhs-number-update',
  validate,
  pageContent,
  contentSummary,
  requestBody
}

module.exports = {
  nhsNumberUpdate,
  contentSummary,
  requestBody
}

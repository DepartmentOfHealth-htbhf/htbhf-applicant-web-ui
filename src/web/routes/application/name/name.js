const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('name.title'),
  heading: translate('name.heading'),
  hint: translate('name.hint'),
  firstNameLabel: translate('name.firstNameLabel'),
  lastNameLabel: translate('name.lastNameLabel'),
  buttonText: translate('buttons:continue'),
  explanation: translate('name.explanation')
})

const contentSummary = (req) => ({
  key: req.t('name.summaryKey'),
  value: `${req.session.claim.firstName} ${req.session.claim.lastName}`.trim()
})

const requestBody = (session) => ({
  firstName: session.claim.firstName,
  lastName: session.claim.lastName
})

const name = {
  path: '/name',
  template: 'name',
  validate,
  pageContent,
  contentSummary,
  requestBody
}

module.exports = {
  contentSummary,
  requestBody,
  name
}

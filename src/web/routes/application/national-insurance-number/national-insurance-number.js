const { sanitize } = require('./sanitize')
const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('nationalInsuranceNumber.title'),
  heading: translate('nationalInsuranceNumber.heading'),
  ninoLabel: translate('nationalInsuranceNumber.ninoLabel'),
  hint: translate('nationalInsuranceNumber.hint'),
  explanation: translate('nationalInsuranceNumber.explanation'),
  buttonText: translate('buttons:continue')
})

const contentSummary = (req) => ({
  key: req.t('nationalInsuranceNumber.summaryKey'),
  value: req.session.claim.nino
})

const nationalInsuranceNumber = {
  path: '/national-insurance-number',
  template: 'national-insurance-number',
  sanitize,
  validate,
  pageContent,
  contentSummary
}

module.exports = {
  nationalInsuranceNumber
}

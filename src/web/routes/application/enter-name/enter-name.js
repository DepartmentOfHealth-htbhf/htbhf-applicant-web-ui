const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('enterName.title'),
  heading: translate('enterName.heading'),
  formDescription: translate('enterName.formDescription'),
  firstNameLabel: translate('enterName.firstNameLabel'),
  lastNameLabel: translate('enterName.lastNameLabel'),
  buttonText: translate('buttons:continue')
})

const contentSummary = (req) => ({
  key: req.t('enterName.summaryKey'),
  value: `${req.session.claim.firstName} ${req.session.claim.lastName}`.trim()
})

const enterName = {
  path: '/enter-name',
  next: () => '/enter-nino',
  template: 'enter-name',
  validate,
  pageContent,
  contentSummary
}

module.exports = {
  contentSummary,
  enterName
}

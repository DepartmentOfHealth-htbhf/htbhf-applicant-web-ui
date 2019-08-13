const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('enterName.title'),
  heading: translate('enterName.heading'),
  hint: translate('enterName.hint'),
  firstNameLabel: translate('enterName.firstNameLabel'),
  lastNameLabel: translate('enterName.lastNameLabel'),
  buttonText: translate('buttons:continue'),
  explanation: translate('enterName.explanation')
})

const contentSummary = (req) => ({
  key: req.t('enterName.summaryKey'),
  value: `${req.session.claim.firstName} ${req.session.claim.lastName}`.trim()
})

const enterName = {
  path: '/enter-name',
  template: 'enter-name',
  validate,
  pageContent,
  contentSummary
}

module.exports = {
  contentSummary,
  enterName
}

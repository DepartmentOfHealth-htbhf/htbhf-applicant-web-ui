const { sanitize } = require('./sanitize')
const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('enterNino.title'),
  heading: translate('enterNino.heading'),
  ninoLabel: translate('enterNino.ninoLabel'),
  hint: translate('enterNino.hint'),
  explanation: translate('enterNino.explanation'),
  buttonText: translate('buttons:continue')
})

const contentSummary = (req) => ({
  key: req.t('enterNino.summaryKey'),
  value: req.session.claim.nino
})

const enterNino = {
  path: '/enter-nino',
  next: () => '/manual-address',
  template: 'enter-nino',
  sanitize,
  validate,
  pageContent,
  contentSummary
}

module.exports = {
  enterNino
}

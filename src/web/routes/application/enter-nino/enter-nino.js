const { sanitize } = require('./sanitize')
const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('enterNino.title'),
  heading: translate('enterNino.heading'),
  ninoLabel: translate('enterNino.ninoLabel'),
  hint: translate('enterNino.hint'),
  detail: {
    summaryText: translate('enterNino.detail.summaryText'),
    text: translate('enterNino.detail.text', { ninoLink: 'https://www.gov.uk/lost-national-insurance-number' })
  },
  buttonText: translate('buttons:continue')
})

const contentSummary = (req) => ({
  key: req.t('enterNino.summaryKey'),
  value: req.session.claim.nino
})

const enterNino = {
  path: '/enter-nino',
  previous: '/enter-name',
  next: '/enter-dob',
  template: 'enter-nino',
  sanitize,
  validate,
  pageContent,
  contentSummary
}

module.exports = {
  enterNino
}

const { sanitize } = require('./sanitize')
const { validate } = require('./validate')

const pageContent = (t) => ({
  title: t('enterNino.title'),
  heading: t('enterNino.heading'),
  ninoLabel: t('enterNino.ninoLabel'),
  hint: t('enterNino.hint'),
  detail: {
    summaryText: t('enterNino.detail.summaryText'),
    text: t('enterNino.detail.text', { ninoLink: 'https://www.gov.uk/lost-national-insurance-number' })
  },
  buttonText: t('enterNino.buttonText')
})

const enterNino = {
  path: '/enter-nino',
  next: '/enter-name',
  template: 'enter-nino',
  sanitize,
  validate,
  pageContent
}

module.exports = {
  enterNino
}

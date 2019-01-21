const { sanitize } = require('./sanitize')
const { validate } = require('./validate')

const pageContent = (t) => ({
  title: t('enterNino.title'),
  heading: 'What is your National Insurance number?',
  hint: 'It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.',
  detail: {
    summaryText: 'I do not have my National Insurance number',
    text: t('enterNino.detail.text', { ninoLink: 'https://www.gov.uk/lost-national-insurance-number' })
  }
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

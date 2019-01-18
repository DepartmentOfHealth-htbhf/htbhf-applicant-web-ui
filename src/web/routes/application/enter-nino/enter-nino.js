const { sanitize } = require('./sanitize')
const { validate } = require('./validate')

const pageContent = {
  title: 'What is your National Insurance number?',
  heading: 'What is your National Insurance number?',
  hint: 'It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.',
  detail: {
    summaryText: 'I do not have my National Insurance number',
    text: 'We need to know your National Insurance number to check if you are eligible for Healthy Start vouchers. If you do not have a National Insurance number, please ' +
      '<a target="_blank" href="https://www.gov.uk/lost-national-insurance-number">visit GOV.UK (link opens in a new tab)</a> for help.'
  }
}

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

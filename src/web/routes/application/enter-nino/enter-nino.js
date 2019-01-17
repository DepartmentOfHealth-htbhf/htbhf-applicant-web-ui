const { sanitize } = require('./sanitize')
const { validate } = require('./validate')

const pageContent = {
  title: 'What is your national insurance number?',
  heading: 'What is your national insurance number?',
  hint: 'It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.'
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

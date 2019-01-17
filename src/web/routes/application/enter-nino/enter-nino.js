const pageContent = {
  title: 'What is your national insurance number?',
  heading: 'What is your national insurance number?',
  hint: 'It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.'
}

const enterNino = {
  path: '/enter-nino',
  next: '/enter-name',
  view: 'form',
  template: 'enter-nino',
  sanitize: (req, res, next) => { next() },
  validate: [],
  pageContent
}

module.exports = {
  enterNino
}

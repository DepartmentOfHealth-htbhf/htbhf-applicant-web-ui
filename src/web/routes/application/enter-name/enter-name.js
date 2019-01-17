const { validate } = require('./validate')
const { sanitize } = require('./sanitize')

const pageContent = {
  title: 'What is your name?',
  heading: 'What is your name?',
  formDescription: 'Tell us your full legal name as it appears on your passport or other benefit claims.'
}

const enterName = {
  path: '/enter-name',
  next: '/check',
  template: 'enter-name',
  sanitize,
  validate,
  pageContent
}

module.exports = {
  enterName
}

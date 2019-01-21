const { validate } = require('./validate')
const { sanitize } = require('./sanitize')

const pageContent = (t) => ({
  title: t('enterName.title'),
  heading: t('enterName.heading'),
  formDescription: t('enterName.formDescription'),
  firstNameLabel: t('enterName.firstNameLabel'),
  lastNameLabel: t('enterName.lastNameLabel'),
  buttonText: t('enterName.buttonText')
})

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

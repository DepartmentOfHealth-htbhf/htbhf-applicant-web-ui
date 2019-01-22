const { validate } = require('./validate')
const { sanitize } = require('./sanitize')

const pageContent = ({ translate }) => ({
  title: translate('enterName.title'),
  heading: translate('enterName.heading'),
  formDescription: translate('enterName.formDescription'),
  firstNameLabel: translate('enterName.firstNameLabel'),
  lastNameLabel: translate('enterName.lastNameLabel'),
  buttonText: translate('buttons:continue')
})

const enterName = {
  path: '/enter-name',
  next: '/enter-nino',
  template: 'enter-name',
  sanitize,
  validate,
  pageContent
}

module.exports = {
  enterName
}

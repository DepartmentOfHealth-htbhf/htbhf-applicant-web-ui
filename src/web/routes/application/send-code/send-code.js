const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('sendCode.title'),
  heading: translate('sendCode.heading'),
  hint: translate('sendCode.hint'),
  buttonText: translate('buttons:continue'),
  text: translate('text'),
  email: translate('email'),
  explanation: translate('sendCode.explanation')
})

const sendCode = {
  path: '/send-code',
  next: () => '/enter-code',
  template: 'send-code',
  pageContent,
  validate
}

module.exports = {
  sendCode
}

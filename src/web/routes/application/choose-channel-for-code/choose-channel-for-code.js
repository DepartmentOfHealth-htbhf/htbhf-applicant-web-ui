const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('chooseChannelForCode.title'),
  heading: translate('chooseChannelForCode.heading'),
  hint: translate('chooseChannelForCode.hint'),
  buttonText: translate('buttons:continue'),
  text: translate('text'),
  email: translate('email'),
  explanation: translate('chooseChannelForCode.explanation')
})

const chooseChannelForCode = {
  path: '/choose-channel-for-code',
  next: () => '/check',
  template: 'choose-channel-for-code',
  pageContent,
  validate
}

module.exports = {
  chooseChannelForCode
}

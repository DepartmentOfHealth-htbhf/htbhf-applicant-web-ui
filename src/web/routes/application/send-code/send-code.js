const { CONFIRMATION_CODE_SESSION_PROPERTY } = require('../common/constants')
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

const behaviourForPost = (req, res, next) => {
  req.session[CONFIRMATION_CODE_SESSION_PROPERTY] = '123456'
  next()
}

const sendCode = {
  path: '/send-code',
  next: () => '/enter-code',
  template: 'send-code',
  pageContent,
  behaviourForPost,
  validate
}

module.exports = {
  sendCode
}

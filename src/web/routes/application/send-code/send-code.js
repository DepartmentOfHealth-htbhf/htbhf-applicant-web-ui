const { sendConfirmationCode } = require('./notify')
const { validationResult } = require('express-validator')

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
  if (validationResult(req).isEmpty()) {
    // TODO DW HTBHF-1735 Randomly generate the code
    const confirmationCode = '123456'
    sendConfirmationCode(req.session.claim, req.body.channelForCode, confirmationCode)
    req.session.confirmationCode = confirmationCode
  }

  next()
}

const sendCode = {
  path: '/send-code',
  next: () => '/enter-code',
  template: 'send-code',
  pageContent,
  validate,
  behaviourForPost
}

module.exports = {
  sendCode
}

const { validationResult } = require('express-validator')
const { sendConfirmationCode } = require('./notify')
const { CONFIRMATION_CODE_ENTERED_SESSION_PROPERTY } = require('../common/constants')
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
  if (validationResult(req).isEmpty()) {
    // TODO DW HTBHF-1735 Randomly generate the code
    const confirmationCode = '123456'
    sendConfirmationCode(req.session.claim, req.body.channelForCode, confirmationCode)
    req.session[CONFIRMATION_CODE_SESSION_PROPERTY] = '123456'
  }

  next()
}

// do not let the user select a confirmation code channel if the code has already been entered successfully
const isNavigable = (session) => session[CONFIRMATION_CODE_ENTERED_SESSION_PROPERTY] !== true

const sendCode = {
  path: '/send-code',
  next: () => '/enter-code',
  template: 'send-code',
  pageContent,
  validate,
  behaviourForPost,
  isNavigable
}

module.exports = {
  sendCode
}

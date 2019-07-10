const { validationResult } = require('express-validator')

const { CONFIRMATION_CODE_ENTERED_SESSION_PROPERTY } = require('../common/constants')
const { validate } = require('./validate')
const { TEXT, EMAIL } = require('../common/constants')

const pageContent = ({ translate }) => ({
  title: translate('enterCode.title'),
  heading: translate('enterCode.heading'),
  codeLabel: translate('enterCode.codeLabel'),
  weJustSentASixDigitCodeTo: translate('enterCode.weJustSentASixDigitCodeTo'),
  itMayTakeAFewMinutesToArrive: translate('enterCode.itMayTakeAFewMinutesToArrive'),
  requestANewCode: translate('enterCode.requestANewCode'),
  ifItDoesNotArrive: translate('enterCode.ifItDoesNotArrive'),
  buttonText: translate('buttons:continue')
})

const getConfirmationCodeDestination = (claim) => {
  if (claim.channelForCode === TEXT) {
    return claim.phoneNumber
  }
  if (claim.channelForCode === EMAIL) {
    return claim.emailAddress
  }

  throw new Error(`Expecting 'channelForCode' option to be either 'text' or 'email', instead was ${claim.channelForCode}`)
}

const behaviourForGet = (req, res, next) => {
  res.locals.confirmationCodeDestination = getConfirmationCodeDestination(req.session.claim)
  next()
}

const behaviourForPost = (req, reqs, next) => {
  if (validationResult(req).isEmpty()) {
    req.session[CONFIRMATION_CODE_ENTERED_SESSION_PROPERTY] = true
  }

  next()
}

// do not let the user enter a confirmation code if the code has already been entered
const isNavigable = (session) => session[CONFIRMATION_CODE_ENTERED_SESSION_PROPERTY] !== true

const enterCode = {
  path: '/enter-code',
  next: () => '/check',
  template: 'enter-code',
  pageContent,
  behaviourForGet,
  validate,
  isNavigable,
  behaviourForPost
}

module.exports = {
  enterCode,
  getConfirmationCodeDestination
}

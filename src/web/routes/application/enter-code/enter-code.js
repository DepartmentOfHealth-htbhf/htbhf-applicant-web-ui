const { TEXT, EMAIL } = require('../common/constants')

const pageContent = ({ translate }) => ({
  title: translate('enterCode.title'),
  heading: translate('enterCode.heading'),
  codeLabel: translate('enterCode.codeLabel'),
  weJustSentASixDigitCodeTo: translate('enterCode.weJustSentASixDigitCodeTo'),
  itMayTakeAFewMinutesToArrive: translate('enterCode.itMayTakeAFewMinutesToArrive'),
  requestNewCode: translate('enterCode.requestNewCode'),
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

const enterCode = {
  path: '/enter-code',
  next: () => '/check',
  template: 'enter-code',
  pageContent,
  behaviourForGet
}

module.exports = {
  enterCode,
  getConfirmationCodeDestination
}

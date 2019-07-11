// reset confirmation code and reset state to in progress so that the user is not taken straight back to check details.
const { CONFIRMATION_CODE_ENTERED_SESSION_PROPERTY } = require('./constants')
const { stateMachine, states } = require('../common/state-machine')

const handleConfirmationCodeReset = req => {
  req.session[CONFIRMATION_CODE_ENTERED_SESSION_PROPERTY] = false
  req.session.claim.confirmationCode = null
  stateMachine.setState(states.IN_PROGRESS, req)
}

const getConfirmationCodeChannel = req => req.session.claim.channelForCode

module.exports = {
  handleConfirmationCodeReset,
  getConfirmationCodeChannel
}

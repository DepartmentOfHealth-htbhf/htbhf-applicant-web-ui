const test = require('tape')

const { handleConfirmationCodeReset } = require('./confirmation-code')
const { states } = require('../flow-control')

test('handleConfirmationCodeReset', (t) => {
  const req = {
    session: {
      confirmationCodeEntered: true,
      claim: {
        confirmationCode: '123456'
      },
      state: states.IN_REVIEW
    }
  }

  handleConfirmationCodeReset(req)

  t.equal(req.session.confirmationCodeEntered, false)
  t.equal(req.session.claim.confirmationCode, null)
  t.equal(req.session.state, states.IN_PROGRESS)
  t.end()
})

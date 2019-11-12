const test = require('tape')

const { handleConfirmationCodeReset } = require('./confirmation-code')
const { states, testUtils } = require('../../flow-control')

const { buildSessionForJourney, getStateForJourney } = testUtils
const { IN_PROGRESS, IN_REVIEW } = states

test('handleConfirmationCodeReset', (t) => {
  const journey = { name: 'apply' }

  const req = {
    session: {
      confirmationCodeEntered: true,
      claim: {
        confirmationCode: '123456'
      },
      ...buildSessionForJourney({ journeyName: 'apply', state: IN_REVIEW })
    }
  }

  handleConfirmationCodeReset(req, journey)

  t.equal(req.session.confirmationCodeEntered, false)
  t.equal(req.session.claim.confirmationCode, null)
  t.equal(getStateForJourney('apply', req), IN_PROGRESS)
  t.end()
})

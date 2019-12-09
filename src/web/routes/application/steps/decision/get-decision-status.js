const { equals, compose, prop, cond, always } = require('ramda')

const SUCCESS = 'success'
const FAIL = 'fail'
const PENDING = 'pending'

const outcomeNotMatched = equals('not_matched')
const outcomeNotConfirmed = equals('not_confirmed')

const identityOutcomeNotMatched = compose(outcomeNotMatched, prop('identityOutcome'))
const eligibilityOutcomeNotConfirmed = compose(outcomeNotConfirmed, prop('eligibilityOutcome'))

const isFailure = result => identityOutcomeNotMatched(result) || eligibilityOutcomeNotConfirmed(result)

const getDecisionStatus = cond([
  [isFailure, always(FAIL)]
])

module.exports = {
  statuses: {
    SUCCESS,
    FAIL,
    PENDING
  },
  getDecisionStatus
}

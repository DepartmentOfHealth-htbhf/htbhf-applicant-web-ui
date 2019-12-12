const { equals, compose, path, prop, cond, always } = require('ramda')
const { FAIL } = require('./decision-statuses')
const { DUPLICATE } = require('./eligibility-statuses')

const verificationResultProp = prop => path(['verificationResult', prop])

const outcomeNotMatched = equals('not_matched')
const outcomeNotConfirmed = equals('not_confirmed')
const isDuplicate = equals(DUPLICATE)

const identityOutcomeNotMatched = compose(outcomeNotMatched, verificationResultProp('identityOutcome'))
const eligibilityOutcomeNotConfirmed = compose(outcomeNotConfirmed, verificationResultProp('eligibilityOutcome'))

const isDuplicateClaim = compose(isDuplicate, prop('eligibilityStatus'))

const isFailure = result => identityOutcomeNotMatched(result) || eligibilityOutcomeNotConfirmed(result)

const getDecisionStatus = cond([
  [isDuplicateClaim, always(FAIL)],
  [isFailure, always(FAIL)]
])

module.exports = {
  getDecisionStatus
}

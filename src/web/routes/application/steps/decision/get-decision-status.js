const { equals, compose, path, prop, cond, always, anyPass } = require('ramda')
const { FAIL, PENDING } = require('./decision-statuses')
const { DUPLICATE } = require('./eligibility-statuses')

const verificationResultProp = prop => path(['verificationResult', prop])

const outcomeNotMatched = equals('not_matched')
const outcomeNotConfirmed = equals('not_confirmed')

const notPregnantAndNoChildMatched = compose(equals(false), verificationResultProp('isPregnantOrAtLeast1ChildMatched'))
const identityOutcomeNotMatched = compose(outcomeNotMatched, verificationResultProp('identityOutcome'))
const eligibilityOutcomeNotConfirmed = compose(outcomeNotConfirmed, verificationResultProp('eligibilityOutcome'))
const addressLine1MatchNotMatched = compose(outcomeNotMatched, verificationResultProp('addressLine1Match'))

const postcodeMatchNotMatched = compose(outcomeNotMatched, verificationResultProp('postcodeMatch'))

const isDuplicateClaim = compose(equals(DUPLICATE), prop('eligibilityStatus'))

const isFailure = anyPass([identityOutcomeNotMatched, eligibilityOutcomeNotConfirmed, notPregnantAndNoChildMatched])

const addressMismatches = anyPass([addressLine1MatchNotMatched, postcodeMatchNotMatched])

const getDecisionStatus = cond([
  [isDuplicateClaim, always(FAIL)],
  [isFailure, always(FAIL)],
  [addressMismatches, always(PENDING)]
])

module.exports = {
  getDecisionStatus
}

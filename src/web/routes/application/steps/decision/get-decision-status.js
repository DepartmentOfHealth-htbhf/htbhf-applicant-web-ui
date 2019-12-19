const { equals, compose, path, prop, cond, always, anyPass, not } = require('ramda')
const { FAIL, PENDING } = require('./decision-statuses')
const { DUPLICATE } = require('./eligibility-statuses')

const verificationResultProp = prop => path(['verificationResult', prop])

const outcomeEqualsNotMatched = equals('not_matched')
const outcomeDoesNotEqualMatched = compose(not, equals('matched'))
const outcomeNotConfirmed = equals('not_confirmed')

const notPregnantAndNoChildMatched = compose(equals(false), verificationResultProp('isPregnantOrAtLeast1ChildMatched'))
const identityOutcomeNotMatched = compose(outcomeEqualsNotMatched, verificationResultProp('identityOutcome'))
const eligibilityOutcomeNotConfirmed = compose(outcomeNotConfirmed, verificationResultProp('eligibilityOutcome'))
const addressLine1MatchNotMatched = compose(outcomeEqualsNotMatched, verificationResultProp('addressLine1Match'))
const emailAddressMatchNotMatched = compose(outcomeDoesNotEqualMatched, verificationResultProp('emailAddressMatch'))
const mobilePhoneNotMatched = compose(outcomeDoesNotEqualMatched, verificationResultProp('mobilePhoneMatch'))

const postcodeMatchNotMatched = compose(outcomeEqualsNotMatched, verificationResultProp('postcodeMatch'))

const isDuplicateClaim = compose(equals(DUPLICATE), prop('eligibilityStatus'))

const addressMismatches = anyPass([addressLine1MatchNotMatched, postcodeMatchNotMatched])

const emailOrPhoneMismatches = anyPass([emailAddressMatchNotMatched, mobilePhoneNotMatched])

const getDecisionStatus = cond([
  [isDuplicateClaim, always(FAIL)],
  [identityOutcomeNotMatched, always(FAIL)],
  [eligibilityOutcomeNotConfirmed, always(FAIL)],
  [addressMismatches, always(PENDING)],
  [notPregnantAndNoChildMatched, always(FAIL)],
  [emailOrPhoneMismatches, always(PENDING)]
])

module.exports = {
  getDecisionStatus
}

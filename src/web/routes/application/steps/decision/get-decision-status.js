const { equals, compose, path, prop, cond, always, allPass, anyPass, not } = require('ramda')
const { FAIL, PENDING, SUCCESS } = require('./decision-statuses')
const { DUPLICATE } = require('./eligibility-statuses')

const verificationResultProp = prop => path(['verificationResult', prop])

const outcomeEqualsNotMatched = equals('not_matched')
const outcomeEqualsMatched = equals('matched')
const outcomeDoesNotEqualMatched = compose(not, equals('matched'))
const outcomeNotConfirmed = equals('not_confirmed')
const outcomeConfirmed = equals('confirmed')
const isFalse = equals(false)
const isTrue = equals(true)

const notPregnantAndNoChildMatched = compose(isFalse, verificationResultProp('isPregnantOrAtLeast1ChildMatched'))
const isPregnantOrAtLeast1ChildMatched = compose(isTrue, verificationResultProp('isPregnantOrAtLeast1ChildMatched'))
const identityOutcomeNotMatched = compose(outcomeEqualsNotMatched, verificationResultProp('identityOutcome'))
const identityOutcomeMatched = compose(outcomeEqualsMatched, verificationResultProp('identityOutcome'))
const eligibilityOutcomeNotConfirmed = compose(outcomeNotConfirmed, verificationResultProp('eligibilityOutcome'))
const eligibilityOutcomeConfirmed = compose(outcomeConfirmed, verificationResultProp('eligibilityOutcome'))
const addressLine1MatchNotMatched = compose(outcomeEqualsNotMatched, verificationResultProp('addressLine1Match'))
const addressLine1MatchMatched = compose(outcomeEqualsMatched, verificationResultProp('addressLine1Match'))
const emailAddressMatchNotMatched = compose(outcomeDoesNotEqualMatched, verificationResultProp('emailAddressMatch'))
const emailAddressMatchMatched = compose(outcomeEqualsMatched, verificationResultProp('emailAddressMatch'))
const mobilePhoneNotMatched = compose(outcomeDoesNotEqualMatched, verificationResultProp('mobilePhoneMatch'))
const mobilePhoneMatched = compose(outcomeEqualsMatched, verificationResultProp('mobilePhoneMatch'))

const postcodeMatchNotMatched = compose(outcomeEqualsNotMatched, verificationResultProp('postcodeMatch'))
const postcodeMatchMatched = compose(outcomeEqualsMatched, verificationResultProp('postcodeMatch'))

const isDuplicateClaim = compose(equals(DUPLICATE), prop('eligibilityStatus'))

const addressMismatches = anyPass([addressLine1MatchNotMatched, postcodeMatchNotMatched])

const emailOrPhoneMismatches = anyPass([emailAddressMatchNotMatched, mobilePhoneNotMatched])

const isFullMatch = allPass([emailAddressMatchMatched, mobilePhoneMatched, postcodeMatchMatched, addressLine1MatchMatched,
  isPregnantOrAtLeast1ChildMatched, eligibilityOutcomeConfirmed, identityOutcomeMatched])

const getDecisionStatus = cond([
  [isDuplicateClaim, always(FAIL)],
  [identityOutcomeNotMatched, always(FAIL)],
  [eligibilityOutcomeNotConfirmed, always(FAIL)],
  [addressMismatches, always(PENDING)],
  [notPregnantAndNoChildMatched, always(FAIL)],
  [emailOrPhoneMismatches, always(PENDING)],
  [isFullMatch, always(SUCCESS)]
])

module.exports = {
  getDecisionStatus
}

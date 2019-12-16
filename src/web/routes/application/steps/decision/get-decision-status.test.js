const test = require('tape')
const { getDecisionStatus } = require('./get-decision-status')
const { FAIL, PENDING } = require('./decision-statuses')
const { DUPLICATE, ELIGIBLE } = require('./eligibility-statuses')

const SUCCESSFUL_RESULT = {
  deathVerificationFlag: 'n/a',
  mobilePhoneMatch: 'matched',
  emailAddressMatch: 'matched',
  addressLine1Match: 'matched',
  postcodeMatch: 'matched',
  pregnantChildDOBMatch: 'not_supplied',
  qualifyingBenefits: 'universal_credit',
  identityOutcome: 'matched',
  eligibilityOutcome: 'confirmed',
  isPregnantOrAtLeast1ChildMatched: 'true'
}

const PENDING_RESULT = {
  deathVerificationFlag: 'n/a',
  mobilePhoneMatch: 'not_matched',
  emailAddressMatch: 'not_matched',
  addressLine1Match: 'matched',
  postcodeMatch: 'matched',
  pregnantChildDOBMatch: 'not_supplied',
  qualifyingBenefits: 'universal_credit',
  identityOutcome: 'matched',
  eligibilityOutcome: 'confirmed'
}

const IDENTITY_NOT_MATCHED_RESULT = {
  deathVerificationFlag: 'n/a',
  mobilePhoneMatch: 'not_set',
  emailAddressMatch: 'not_set',
  addressLine1Match: 'not_set',
  postcodeMatch: 'not_set',
  pregnantChildDOBMatch: 'not_set',
  qualifyingBenefits: 'not_set',
  identityOutcome: 'not_matched',
  eligibilityOutcome: 'not_set'
}

const ELIGIBILITY_NOT_CONFIRMED_RESULT = {
  deathVerificationFlag: 'n/a',
  mobilePhoneMatch: 'not_set',
  emailAddressMatch: 'not_set',
  addressLine1Match: 'not_set',
  postcodeMatch: 'not_set',
  pregnantChildDOBMatch: 'not_set',
  qualifyingBenefits: 'not_set',
  identityOutcome: 'matched',
  eligibilityOutcome: 'not_confirmed'
}

const ELIGIBILITY_CONFIRMED_RESULT = {
  deathVerificationFlag: 'n/a',
  mobilePhoneMatch: 'not_set',
  emailAddressMatch: 'not_set',
  addressLine1Match: 'not_set',
  postcodeMatch: 'not_set',
  pregnantChildDOBMatch: 'not_set',
  qualifyingBenefits: 'not_set',
  identityOutcome: 'matched',
  eligibilityOutcome: 'confirmed',
  isPregnantOrAtLeast1ChildMatched: 'true'

}

const NOT_PREGNANT_AND_NO_CHILDREN_MATCHED_RESULT = {
  deathVerificationFlag: 'n/a',
  mobilePhoneMatch: 'not_held',
  emailAddressMatch: 'not_held',
  addressLine1Match: 'matched',
  postcodeMatch: 'matched',
  pregnantChildDOBMatch: 'not_held',
  qualifyingBenefits: 'universal_credit',
  identityOutcome: 'matched',
  eligibilityOutcome: 'confirmed',
  isPregnantOrAtLeast1ChildMatched: false
}

const DUPLICATE_RESULT = undefined // A DUPLICATE response from the claimant service will not return a verification result

test('getDecisionStatus() should return undefined if verification result has no matching decision', (t) => {
  // TODO these non matching results will need to be updated as stories for epic 'receive my decision' are completed
  const nonMatchingResults = [{}, SUCCESSFUL_RESULT, PENDING_RESULT]
  nonMatchingResults.forEach(verificationResult => {
    t.equal(getDecisionStatus({ verificationResult }), undefined, 'non matching result returns undefined')
  })
  t.end()
})

test(`getDecisionStatus() should return ${FAIL} if identity not matched`, (t) => {
  t.equal(getDecisionStatus({ verificationResult: IDENTITY_NOT_MATCHED_RESULT }), FAIL, `returns ${FAIL} if identity not matched`)
  t.end()
})

test(`getDecisionStatus() should return ${FAIL} if eligibility not confirmed`, (t) => {
  t.equal(getDecisionStatus({ verificationResult: ELIGIBILITY_NOT_CONFIRMED_RESULT }), FAIL, `returns ${FAIL} if eligibility not confirmed`)
  t.end()
})

test(`getDecisionStatus() should return ${FAIL} if eligibility status is duplicate`, (t) => {
  t.equal(getDecisionStatus({ verificationResult: DUPLICATE_RESULT, eligibilityStatus: DUPLICATE }), FAIL, `returns ${FAIL} if eligibility status is duplicate`)
  t.end()
})

test(`getDecisionStatus() should return ${FAIL} if isPregnantOrAtLeast1ChildMatched flag is false`, (t) => {
  t.equal(getDecisionStatus({ verificationResult: NOT_PREGNANT_AND_NO_CHILDREN_MATCHED_RESULT, eligibilityStatus: ELIGIBLE }), FAIL,
    `returns ${FAIL} if eligibility status is duplicate`)
  t.end()
})

test(`getDecisionStatus() should return ${PENDING} if address mismatches`, (t) => {
  const mismatchingAddressResults = [
    { ...ELIGIBILITY_CONFIRMED_RESULT, addressLine1Match: 'not_matched', postcodeMatch: 'matched' },
    { ...ELIGIBILITY_CONFIRMED_RESULT, addressLine1Match: 'matched', postcodeMatch: 'not_matched' },
    { ...ELIGIBILITY_CONFIRMED_RESULT, addressLine1Match: 'not_matched', postcodeMatch: 'not_matched' }
  ]

  mismatchingAddressResults.forEach(verificationResult => {
    t.equal(getDecisionStatus({ verificationResult, eligibilityStatus: ELIGIBLE }), PENDING, `returns ${PENDING} if address mismatches`)
  })
  t.end()
})

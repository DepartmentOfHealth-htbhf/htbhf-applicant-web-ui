const test = require('tape')
const { getDecisionStatus } = require('./get-decision-status')
const { FAIL, PENDING, SUCCESS } = require('./decision-statuses')
const { DUPLICATE, ELIGIBLE } = require('./eligibility-statuses')

const SUCCESSFUL_RESULT = {
  identityOutcome: 'matched',
  eligibilityOutcome: 'confirmed',
  addressLine1Match: 'matched',
  postcodeMatch: 'matched',
  isPregnantOrAtLeast1ChildMatched: true,
  mobilePhoneMatch: 'matched',
  emailAddressMatch: 'matched',
  qualifyingBenefits: 'universal_credit',
  pregnantChildDOBMatch: 'not_supplied',
  deathVerificationFlag: 'n/a'
}

const IDENTITY_NOT_MATCHED_RESULT = {
  identityOutcome: 'not_matched',
  eligibilityOutcome: 'not_set',
  addressLine1Match: 'not_set',
  postcodeMatch: 'not_set',
  isPregnantOrAtLeast1ChildMatched: true,
  mobilePhoneMatch: 'not_set',
  emailAddressMatch: 'not_set',
  qualifyingBenefits: 'not_set',
  pregnantChildDOBMatch: 'not_set',
  deathVerificationFlag: 'n/a'
}

const ELIGIBILITY_NOT_CONFIRMED_RESULT = {
  identityOutcome: 'matched',
  eligibilityOutcome: 'not_confirmed',
  addressLine1Match: 'not_set',
  postcodeMatch: 'not_set',
  isPregnantOrAtLeast1ChildMatched: true,
  mobilePhoneMatch: 'not_set',
  emailAddressMatch: 'not_set',
  qualifyingBenefits: 'not_set',
  pregnantChildDOBMatch: 'not_set',
  deathVerificationFlag: 'n/a'
}

const ELIGIBILITY_CONFIRMED_RESULT = {
  identityOutcome: 'matched',
  eligibilityOutcome: 'confirmed',
  addressLine1Match: 'not_set',
  postcodeMatch: 'not_set',
  isPregnantOrAtLeast1ChildMatched: true,
  mobilePhoneMatch: 'not_set',
  emailAddressMatch: 'not_set',
  qualifyingBenefits: 'not_set',
  pregnantChildDOBMatch: 'not_set',
  deathVerificationFlag: 'n/a'
}

const ADDRESS_MATCHED_RESULT = {
  identityOutcome: 'matched',
  eligibilityOutcome: 'confirmed',
  addressLine1Match: 'matched',
  postcodeMatch: 'matched',
  isPregnantOrAtLeast1ChildMatched: true,
  mobilePhoneMatch: 'not_matched',
  emailAddressMatch: 'not_matched',
  qualifyingBenefits: 'not_set',
  pregnantChildDOBMatch: 'not_set',
  deathVerificationFlag: 'n/a'
}

const NOT_PREGNANT_AND_NO_CHILDREN_MATCHED_RESULT = {
  identityOutcome: 'matched',
  eligibilityOutcome: 'confirmed',
  addressLine1Match: 'matched',
  postcodeMatch: 'matched',
  isPregnantOrAtLeast1ChildMatched: false,
  mobilePhoneMatch: 'not_held',
  emailAddressMatch: 'not_held',
  qualifyingBenefits: 'universal_credit',
  pregnantChildDOBMatch: 'not_held',
  deathVerificationFlag: 'n/a'
}

const DUPLICATE_RESULT = undefined // A DUPLICATE response from the claimant service will not return a verification result

test(`getDecisionStatus() should return ${SUCCESS} if verification result has no matching decision`, (t) => {
  t.equal(getDecisionStatus({ verificationResult: SUCCESSFUL_RESULT }), SUCCESS, `returns ${SUCCESS} when full pass result is matched`)
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
    { ...ELIGIBILITY_CONFIRMED_RESULT, addressLine1Match: 'not_matched', postcodeMatch: 'not_matched' },
    { ...ELIGIBILITY_CONFIRMED_RESULT, addressLine1Match: 'not_matched', postcodeMatch: 'not_matched', isPregnantOrAtLeast1ChildMatched: false }
  ]

  mismatchingAddressResults.forEach(verificationResult => {
    t.equal(getDecisionStatus({ verificationResult, eligibilityStatus: ELIGIBLE }), PENDING, `returns ${PENDING} if address mismatches`)
  })
  t.end()
})

test(`getDecisionStatus() should return ${PENDING} if email and/or phone mismatches`, (t) => {
  const mismatchingAddressResults = [
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_matched', emailAddressMatch: 'matched' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_matched', emailAddressMatch: 'not_matched' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_matched', emailAddressMatch: 'not_set' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_matched', emailAddressMatch: 'not_held' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_set', emailAddressMatch: 'matched' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_set', emailAddressMatch: 'not_matched' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_set', emailAddressMatch: 'not_held' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'matched', emailAddressMatch: 'not_set' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'matched', emailAddressMatch: 'not_matched' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'matched', emailAddressMatch: 'not_held' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_held', emailAddressMatch: 'matched' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_held', emailAddressMatch: 'not_matched' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_held', emailAddressMatch: 'not_set' },
    { ...ADDRESS_MATCHED_RESULT, mobilePhoneMatch: 'not_held', emailAddressMatch: 'not_held' }
  ]

  mismatchingAddressResults.forEach(verificationResult => {
    t.equal(getDecisionStatus({ verificationResult, eligibilityStatus: ELIGIBLE }), PENDING, `returns ${PENDING} if email and/or phone mismatches`)
  })
  t.end()
})

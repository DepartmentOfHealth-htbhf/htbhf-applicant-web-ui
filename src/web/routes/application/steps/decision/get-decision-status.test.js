const test = require('tape')
const { getDecisionStatus } = require('./get-decision-status')
const { FAIL } = require('./decision-statuses')

const SUCCESSFUL_RESULT = {
  deathVerificationFlag: 'n/a',
  mobilePhoneMatch: 'matched',
  emailAddressMatch: 'matched',
  addressLine1Match: 'matched',
  postcodeMatch: 'matched',
  pregnantChildDOBMatch: 'not_supplied',
  qualifyingBenefits: 'universal_credit',
  identityOutcome: 'matched',
  eligibilityOutcome: 'confirmed'
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

test('getDecisionStatus() should return undefined if verification result has no matching decision', (t) => {
  // TODO these non matching results will need to be updated as stories for epic 'receive my decision' are completed
  const nonMatchingResults = [{}, SUCCESSFUL_RESULT, PENDING_RESULT]
  nonMatchingResults.forEach(result => {
    t.equal(getDecisionStatus(result), undefined, 'non matching result returns undefined')
  })
  t.end()
})

test(`getDecisionStatus() should return ${FAIL} if identity not matched`, (t) => {
  t.equal(getDecisionStatus(IDENTITY_NOT_MATCHED_RESULT), FAIL, `returns ${FAIL} if identity not matched`)
  t.end()
})

test(`getDecisionStatus() should return ${FAIL} if eligibility not confirmed`, (t) => {
  t.equal(getDecisionStatus(ELIGIBILITY_NOT_CONFIRMED_RESULT), FAIL, `returns ${FAIL} if eligibility not confirmed`)
  t.end()
})

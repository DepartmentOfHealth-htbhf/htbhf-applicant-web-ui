module.exports = {
  status: 201,
  jsonBody: {
    claimStatus: 'NEW',
    eligibilityStatus: 'ELIGIBLE',
    voucherEntitlement: {
      vouchersForChildrenUnderOne: 2,
      vouchersForChildrenBetweenOneAndFour: 1,
      vouchersForPregnancy: 1,
      totalVoucherEntitlement: 4,
      singleVoucherValueInPence: 310,
      totalVoucherValueInPence: 1240
    },
    verificationResult: {
      deathVerificationFlag: 'n/a',
      mobilePhoneMatch: 'matched',
      emailAddressMatch: 'matched',
      addressLine1Match: 'matched',
      postcodeMatch: 'matched',
      pregnantChildDOBMatch: 'not_supplied',
      qualifyingReason: 'universal_credit',
      identityOutcome: 'matched',
      eligibilityOutcome: 'confirmed',
      isPregnantOrAtLeast1ChildMatched: true
    }
  },
  headers: {
    'Content-Type': 'application/json'
  }
}

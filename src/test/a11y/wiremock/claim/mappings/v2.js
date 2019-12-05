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
    }
  },
  headers: {
    'Content-Type': 'application/json'
  }
}

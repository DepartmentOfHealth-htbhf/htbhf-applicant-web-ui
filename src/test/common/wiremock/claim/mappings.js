
const CLAIMS_ENDPOINT = '/v2/claims'
const ID_HEADERS_MATCH = '([A-Za-z0-9_-])+'

const voucherEntitlement = {
  vouchersForChildrenUnderOne: 2,
  vouchersForChildrenBetweenOneAndFour: 1,
  vouchersForPregnancy: 1,
  totalVoucherEntitlement: 4,
  singleVoucherValueInPence: 310,
  totalVoucherValueInPence: 1240
}

const createSuccessfulClaimsMapping = () => {
  return JSON.stringify({
    'request': {
      'method': 'POST',
      'url': CLAIMS_ENDPOINT,
      'headers': {
        'X-Request-ID': {
          'matches': ID_HEADERS_MATCH
        },
        'X-Session-ID': {
          'matches': ID_HEADERS_MATCH
        }
      }
    },
    'response': {
      'status': 201,
      'jsonBody': {
        'claimStatus': 'NEW',
        'eligibilityStatus': 'ELIGIBLE',
        voucherEntitlement
      },
      'headers': {
        'Content-Type': 'application/json'
      }
    }
  })
}

module.exports = {
  createSuccessfulClaimsMapping
}

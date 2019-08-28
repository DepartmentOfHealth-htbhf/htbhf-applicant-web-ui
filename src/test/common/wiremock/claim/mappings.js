const { CLAIMS_ENDPOINT } = require('../../constants')

const ID_HEADERS_MATCH = '([A-Za-z0-9_-])+'

const eligibilityStatusToStatusCodeMap = {
  ELIGIBLE: 201,
  'INELIGIBLE': 200,
  'PENDING': 200,
  'NO_MATCH': 404,
  'ERROR': 200,
  'DUPLICATE': 200
}

const voucherEntitlement = {
  vouchersForChildrenUnderOne: 2,
  vouchersForChildrenBetweenOneAndFour: 1,
  vouchersForPregnancy: 1,
  totalVoucherEntitlement: 4,
  singleVoucherValueInPence: 310,
  totalVoucherValueInPence: 1240
}

const updatedFields = ['expectedDeliveryDate']

const createSuccessfulClaimsMapping = (eligibilityStatus) => {
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
      'status': eligibilityStatusToStatusCodeMap[eligibilityStatus],
      'jsonBody': {
        'claimStatus': 'NEW',
        eligibilityStatus,
        ...(eligibilityStatus === 'ELIGIBLE' && { voucherEntitlement })
      },
      'headers': {
        'Content-Type': 'application/json'
      }
    }
  })
}

const createUpdatedClaimsMapping = () => {
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
      'status': 200,
      'jsonBody': {
        'claimStatus': 'ACTIVE',
        'eligibilityStatus': 'ELIGIBLE',
        'claimUpdated': true,
        'updatedFields': updatedFields,
        voucherEntitlement
      },
      'headers': {
        'Content-Type': 'application/json'
      }
    }
  })
}

const ERROR_CLAIMS_MAPPING = JSON.stringify({
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
    'status': 500
  }
})

module.exports = {
  createSuccessfulClaimsMapping,
  createUpdatedClaimsMapping,
  ERROR_CLAIMS_MAPPING
}

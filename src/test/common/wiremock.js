const { postJsonData, performDelete } = require('./request')
const { ELIGIBLE, CLAIMS_ENDPOINT } = require('./constants')

const WIREMOCK_MAPPING_URL = process.env.WIREMOCK_URL
  ? `${process.env.WIREMOCK_URL}/__admin/mappings`
  : 'http://localhost:8090/__admin/mappings'

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

async function setupSuccessfulWiremockClaimMapping () {
  await postJsonData(WIREMOCK_MAPPING_URL, createSuccessfulClaimsMapping(ELIGIBLE))
}

async function setupSuccessfulWiremockUpdatedClaimMapping () {
  await postJsonData(WIREMOCK_MAPPING_URL, createUpdatedClaimsMapping())
}

async function setupSuccessfulWiremockClaimMappingWithStatus (status) {
  await postJsonData(WIREMOCK_MAPPING_URL, createSuccessfulClaimsMapping(status))
}

async function setupErrorWiremockClaimMapping () {
  await postJsonData(WIREMOCK_MAPPING_URL, ERROR_CLAIMS_MAPPING)
}

async function deleteAllWiremockMappings () {
  await performDelete(WIREMOCK_MAPPING_URL)
}

module.exports = {
  setupSuccessfulWiremockClaimMappingWithStatus,
  setupSuccessfulWiremockUpdatedClaimMapping,
  deleteAllWiremockMappings,
  setupErrorWiremockClaimMapping,
  setupSuccessfulWiremockClaimMapping
}

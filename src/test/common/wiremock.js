const { postJsonData, performDelete } = require('./request')
const { ELIGIBLE } = require('./constants')

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

const createSuccessfulClaimsMapping = (eligibilityStatus) => {
  return JSON.stringify({
    'request': {
      'method': 'POST',
      'url': '/v1/claims',
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
        eligibilityStatus,
        ...(eligibilityStatus === 'ELIGIBLE' && { voucherEntitlement })
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
    'url': '/v1/claims',
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
  deleteAllWiremockMappings,
  setupErrorWiremockClaimMapping,
  setupSuccessfulWiremockClaimMapping
}

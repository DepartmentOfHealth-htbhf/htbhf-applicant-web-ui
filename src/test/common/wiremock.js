const { postJsonData, performDelete } = require('./request')

const WIREMOCK_MAPPING_URL = process.env.WIREMOCK_URL
  ? `${process.env.WIREMOCK_URL}/__admin/mappings`
  : 'http://localhost:8090/__admin/mappings'

const ID_HEADERS_MATCH = '([A-Za-z0-9_-])+'

const SUCCESSFUL_CLAIMS_MAPPING = JSON.stringify({
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
    'status': 201
  }
})

async function setupSuccessfulWiremockClaimMapping () {
  await postJsonData(WIREMOCK_MAPPING_URL, SUCCESSFUL_CLAIMS_MAPPING)
}

async function deleteAllWiremockMappings () {
  await performDelete(WIREMOCK_MAPPING_URL)
}

module.exports = {
  setupSuccessfulWiremockClaimMapping,
  deleteAllWiremockMappings
}

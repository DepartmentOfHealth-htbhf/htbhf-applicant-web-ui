const { postJsonData, performDelete } = require('../request')
const { WIREMOCK_CLAIMANT_MAPPING_URL, WIREMOCK_CLAIMANT_FIND_REQUESTS_URL, WIREMOCK_OS_PLACES_MAPPING_URL } = require('./paths')

async function deleteAllWiremockMappings () {
  await performDelete(WIREMOCK_CLAIMANT_MAPPING_URL)
  await performDelete(WIREMOCK_OS_PLACES_MAPPING_URL)
}

async function getOutboundRequestsToClaimantService (url) {
  const body = JSON.stringify({
    'method': 'POST',
    url
  })
  const response = await postJsonData(WIREMOCK_CLAIMANT_FIND_REQUESTS_URL, body)
  return JSON.parse(response).requests
}

module.exports = {
  deleteAllWiremockMappings,
  getOutboundRequestsToClaimantService
}

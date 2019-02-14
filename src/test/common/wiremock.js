const { postJsonData, performDelete } = require('./request')

const WIREMOCK_MAPPING_URL = process.env.WIREMOCK_URL ? `${process.env.WIREMOCK_URL}/__admin/mappings` : 'http://localhost:8090/__admin/mappings'

const SUCCESSFUL_CLAIMS_MAPPING = `{
    "request": {
      "method": "POST",
      "url": "/v1/claims"
    },
    "response": {
      "status": 201
    }
  }`

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

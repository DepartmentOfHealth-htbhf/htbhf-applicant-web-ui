const { postJsonData } = require('../../request')
const { ELIGIBLE } = require('../../constants')
const { WIREMOCK_MAPPING_URL } = require('../paths')

const {
  createSuccessfulClaimsMapping,
  createUpdatedClaimsMapping,
  ERROR_CLAIMS_MAPPING
} = require('./mappings')

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

module.exports = {
  setupSuccessfulWiremockClaimMappingWithStatus,
  setupSuccessfulWiremockUpdatedClaimMapping,
  setupErrorWiremockClaimMapping,
  setupSuccessfulWiremockClaimMapping
}

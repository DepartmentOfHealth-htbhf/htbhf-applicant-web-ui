const { postJsonData } = require('../../request')
const { WIREMOCK_CLAIMANT_MAPPING_URL } = require('../paths')
const { createSuccessfulClaimsMapping } = require('./mappings')

async function setupSuccessfulWiremockClaimMapping () {
  await postJsonData(WIREMOCK_CLAIMANT_MAPPING_URL, createSuccessfulClaimsMapping())
}

module.exports = {
  setupSuccessfulWiremockClaimMapping
}

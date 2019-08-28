const { postJsonData } = require('../../request')
const { WIREMOCK_MAPPING_URL } = require('../paths')

const {
  createPostcodeLookupWithNoResultsMapping
} = require('./mappings')

async function setupPostcodeLookupWithNoResults (postcode) {
  await postJsonData(WIREMOCK_MAPPING_URL, createPostcodeLookupWithNoResultsMapping(postcode))
}

module.exports = {
  setupPostcodeLookupWithNoResults
}

const { postJsonData } = require('../../request')
const { WIREMOCK_MAPPING_URL } = require('../paths')

const {
  createPostcodeLookupWithNoResultsMapping,
  createPostcodeLookupWithResultsMapping
} = require('./mappings')

async function setupPostcodeLookupWithNoResults (postcode) {
  await postJsonData(WIREMOCK_MAPPING_URL, createPostcodeLookupWithNoResultsMapping(postcode))
}

async function setupPostcodeLookupWithResults (postcode) {
  await postJsonData(WIREMOCK_MAPPING_URL, createPostcodeLookupWithResultsMapping(postcode))
}

module.exports = {
  setupPostcodeLookupWithNoResults,
  setupPostcodeLookupWithResults
}

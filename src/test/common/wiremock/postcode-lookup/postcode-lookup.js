const { postJsonData } = require('../../request')
const { WIREMOCK_MAPPING_URL } = require('../paths')

const {
  createPostcodeLookupWithNoResultsMapping,
  createPostcodeLookupWithResultsMapping,
  createPostcodeLookupWithErrorResponseMapping
} = require('./mappings')

async function setupPostcodeLookupWithNoResults (postcode) {
  await postJsonData(WIREMOCK_MAPPING_URL, createPostcodeLookupWithNoResultsMapping(postcode))
}

async function setupPostcodeLookupWithResults (postcode) {
  await postJsonData(WIREMOCK_MAPPING_URL, createPostcodeLookupWithResultsMapping(postcode))
}

async function setupPostcodeLookupWithErrorResponse () {
  await postJsonData(WIREMOCK_MAPPING_URL, createPostcodeLookupWithErrorResponseMapping())
}

module.exports = {
  setupPostcodeLookupWithNoResults,
  setupPostcodeLookupWithResults,
  setupPostcodeLookupWithErrorResponse
}

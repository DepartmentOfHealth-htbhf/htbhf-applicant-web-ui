const { postJsonData } = require('../../request')
const { WIREMOCK_OS_PLACES_MAPPING_URL, WIREMOCK_GOOGLE_ANALYTICS_MAPPING_URL } = require('../paths')

const {
  createPostcodeLookupWithResultsMapping,
  createGoogleAnalyticsMapping
} = require('./mappings')

async function setupPostcodeLookupWithResults () {
  await postJsonData(WIREMOCK_GOOGLE_ANALYTICS_MAPPING_URL, createGoogleAnalyticsMapping())
  await postJsonData(WIREMOCK_OS_PLACES_MAPPING_URL, createPostcodeLookupWithResultsMapping())
}

module.exports = {
  setupPostcodeLookupWithResults
}

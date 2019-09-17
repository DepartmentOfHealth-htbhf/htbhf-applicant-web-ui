const WIREMOCK_CLAIMANT_BASE_URL = process.env.CLAIMANT_SERVICE_URL
  ? `${process.env.CLAIMANT_SERVICE_URL}/__admin`
  : 'http://localhost:8090/__admin'
const WIREMOCK_CLAIMANT_MAPPING_URL = `${WIREMOCK_CLAIMANT_BASE_URL}/mappings`
const WIREMOCK_CLAIMANT_FIND_REQUESTS_URL = `${WIREMOCK_CLAIMANT_BASE_URL}/requests/find`

const WIREMOCK_OS_PLACES_BASE_URL = process.env.OS_PLACES_URI
  ? `${process.env.OS_PLACES_URI}/__admin`
  : 'http://localhost:8150/__admin'
const WIREMOCK_OS_PLACES_MAPPING_URL = `${WIREMOCK_OS_PLACES_BASE_URL}/mappings`
const WIREMOCK_OS_PLACES_FIND_REQUESTS_URL = `${WIREMOCK_OS_PLACES_BASE_URL}/requests/find`

const WIREMOCK_GOOGLE_ANALYTICS_MAPPING_URL = WIREMOCK_OS_PLACES_MAPPING_URL

module.exports = {
  WIREMOCK_CLAIMANT_MAPPING_URL,
  WIREMOCK_CLAIMANT_FIND_REQUESTS_URL,
  WIREMOCK_OS_PLACES_MAPPING_URL,
  WIREMOCK_OS_PLACES_FIND_REQUESTS_URL,
  WIREMOCK_GOOGLE_ANALYTICS_MAPPING_URL
}

const WIREMOCK_BASE_URL = process.env.WIREMOCK_URL
  ? `${process.env.WIREMOCK_URL}/__admin`
  : 'http://localhost:8090/__admin'

const WIREMOCK_MAPPING_URL = `${WIREMOCK_BASE_URL}/mappings`

const WIREMOCK_FIND_REQUESTS_URL = `${WIREMOCK_BASE_URL}/requests/find`

module.exports = {
  WIREMOCK_MAPPING_URL,
  WIREMOCK_FIND_REQUESTS_URL
}

const V2 = 'v2'

const RESPONSE_MAP = {
  [V2]: require('./v2')
}

const ID_HEADERS_MATCH = '([A-Za-z0-9_-])+'

const createSuccessfulClaimsMapping = (version = V2) => JSON.stringify({
  request: {
    method: 'POST',
    url: `/${version}/claims`,
    headers: {
      'X-Request-ID': {
        matches: ID_HEADERS_MATCH
      },
      'X-Session-ID': {
        matches: ID_HEADERS_MATCH
      }
    }
  },
  response: RESPONSE_MAP[version]
})

module.exports = {
  createSuccessfulClaimsMapping
}

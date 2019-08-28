const { postJsonData, performDelete } = require('../request')
const { WIREMOCK_MAPPING_URL, WIREMOCK_FIND_REQUESTS_URL } = require('./paths')

async function deleteAllWiremockMappings () {
  await performDelete(WIREMOCK_MAPPING_URL)
}

async function getOutboundRequestsToUrl (url) {
  const body = JSON.stringify({
    'method': 'POST',
    url
  })
  const response = await postJsonData(WIREMOCK_FIND_REQUESTS_URL, body)
  return JSON.parse(response).requests
}

module.exports = {
  deleteAllWiremockMappings,
  getOutboundRequestsToUrl
}

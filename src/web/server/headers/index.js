const uuid = require('uuidv4')
const { REQUEST_ID_HEADER, requestID } = require('./request-id')

module.exports = {
  REQUEST_ID_HEADER: REQUEST_ID_HEADER,
  requestID: requestID(uuid)
}

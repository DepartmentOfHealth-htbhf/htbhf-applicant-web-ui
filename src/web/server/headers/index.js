const uuid = require('uuidv4')
const { requestID } = require('./request-id')

module.exports = {
  requestID: requestID(uuid)
}

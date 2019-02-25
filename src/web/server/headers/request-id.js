const REQUEST_ID_HEADER = 'x-request-id'
const X_VCAP_REQUEST_ID = 'x-vcap-request-id'
const requestID = (uuid) => (req, res, next) => {
  if (!req.headers[REQUEST_ID_HEADER]) {
    req.headers[REQUEST_ID_HEADER] = req.headers[X_VCAP_REQUEST_ID] || uuid()
  }

  next()
}

module.exports = {
  REQUEST_ID_HEADER,
  requestID
}

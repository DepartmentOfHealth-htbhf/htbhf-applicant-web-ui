const requestID = (uuid) => (req, res, next) => {
  if (!req.headers['X-Request-ID']) {
    req.headers['X-Request-ID'] = uuid()
  }

  next()
}

module.exports = {
  requestID
}

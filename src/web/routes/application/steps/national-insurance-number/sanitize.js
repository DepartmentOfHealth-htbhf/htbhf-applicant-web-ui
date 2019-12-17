const remoteWhiteSpace = (nino) => nino.replace(/\s/g, '')

const sanitize = () => (req, res, next) => {
  req.body.sanitizedNino = remoteWhiteSpace(req.body.nino).toUpperCase()
  next()
}

module.exports = {
  sanitize
}

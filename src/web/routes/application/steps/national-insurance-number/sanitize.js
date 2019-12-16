const getSanitizedNino = (nino) => nino.replace(/\s/g, '')

const sanitize = () => (req, res, next) => {
  req.body.sanitizedNino = getSanitizedNino(req.body.nino)
  next()
}

module.exports = {
  sanitize,
  getSanitizedNino
}

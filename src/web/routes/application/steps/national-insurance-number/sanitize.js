const removeWhiteSpace = (text) => { return text.replace(/\s/g, '') }

const sanitize = () => (req, res, next) => {
  req.body.nino = removeWhiteSpace(req.body.nino)
  next()
}

module.exports = {
  sanitize,
  removeWhiteSpace
}

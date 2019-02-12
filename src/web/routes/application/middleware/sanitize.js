const { map, trim, compose } = require('ramda')
const escapeHtml = require('escape-html')

const sanitiseInput = compose(escapeHtml, trim)
const sanitiseBody = map(sanitiseInput)

const sanitize = (req, res, next) => {
  req.body = sanitiseBody(req.body)
  next()
}

module.exports = {
  sanitize,
  sanitiseBody
}

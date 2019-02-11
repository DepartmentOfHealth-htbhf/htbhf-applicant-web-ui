const { map, trim } = require('ramda')
const escapeHtml = require('escape-html')

const trimValues = map(trim)
const escapeValues = map(escapeHtml)

const sanitize = (req, res, next) => {
  req.body = escapeValues(trimValues(req.body))
  next()
}

module.exports = {
  sanitize,
  trimValues,
  escapeValues
}

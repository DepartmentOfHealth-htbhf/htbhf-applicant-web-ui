const { map, trim } = require('ramda')

const trimValues = map(trim)

const sanitize = (req, res, next) => {
  req.body = trimValues(req.body)
  next()
}

module.exports = {
  sanitize,
  trimValues
}

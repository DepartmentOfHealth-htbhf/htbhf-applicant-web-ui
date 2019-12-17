const replaceMultipleSpacesWithOne = (value) => {
  return value.replace(/  +/g, ' ')
}

const sanitize = () => (req, res, next) => {
  req.body.sanitizedPostcode = replaceMultipleSpacesWithOne(req.body.postcode)
  next()
}

module.exports = {
  sanitize
}

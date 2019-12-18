const { toUpper, compose } = require('ramda')

const replaceMultipleSpacesWithOne = (value) => {
  return value.replace(/  +/g, ' ')
}

const replaceMultipleWhitespaceWithOneAndConvertToUpperCase = compose(replaceMultipleSpacesWithOne, toUpper)

const sanitize = () => (req, res, next) => {
  req.body.sanitizedPostcode = replaceMultipleWhitespaceWithOneAndConvertToUpperCase(req.body.postcode)
  next()
}

module.exports = {
  sanitize
}

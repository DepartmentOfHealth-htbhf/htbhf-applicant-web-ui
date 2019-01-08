const { compose, mapObjIndexed, values } = require('ramda')

const toError = (error, key) => ({
  text: error.text,
  href: `#${key}-error`
})

const toErrorList = compose(values, mapObjIndexed(toError))

module.exports = {
  toErrorList
}

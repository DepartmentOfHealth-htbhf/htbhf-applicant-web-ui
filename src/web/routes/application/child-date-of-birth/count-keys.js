const { pickBy } = require('ramda')

const withString = (string) => (val, key) => key.includes(string)

const countKeysContainingString = (string, obj) => {
  const keysForString = pickBy(withString(string), obj)
  return Object.keys(keysForString).length
}

module.exports = {
  countKeysContainingString
}

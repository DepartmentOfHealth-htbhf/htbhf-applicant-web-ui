const { isNil } = require('ramda')

const toBoolean = (value) =>
  isNil(value) ? false : value.toString().toLowerCase() === 'true'

module.exports = {
  toBoolean
}

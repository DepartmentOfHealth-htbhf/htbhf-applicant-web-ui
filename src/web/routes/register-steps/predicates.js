const { compose, equals, type } = require('ramda')

const isType = t => compose(equals(t), type)

const isUndefined = isType('Undefined')

const isBoolean = isType('Boolean')

const isString = isType('String')

module.exports = {
  isUndefined,
  isBoolean,
  isString
}

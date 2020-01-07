const { compose, isNil, isEmpty, or, not, equals, type } = require('ramda')

const isNilOrEmpty = (string) => or(isNil(string), isEmpty(string))

const isNilOrEmptyOrUndefined = (value) => or(isUndefined(value), isNilOrEmpty(value))

const notIsUndefinedOrNullOrEmpty = compose(not, isNilOrEmptyOrUndefined)

const notIsNilOrEmpty = compose(not, isNilOrEmpty)

const notIsNil = compose(not, isNil)

const isType = t => compose(equals(t), type)

const isUndefined = isType('Undefined')

const isBoolean = isType('Boolean')

const isString = isType('String')

module.exports = {
  isNilOrEmpty,
  notIsNilOrEmpty,
  notIsNil,
  isUndefined,
  isBoolean,
  isString,
  notIsUndefinedOrNullOrEmpty
}

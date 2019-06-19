const { compose, isNil, isEmpty, or, not } = require('ramda')

const isNilOrEmpty = (string) => or(isNil(string), isEmpty(string))

const notIsNilOrEmpty = compose(not, isNilOrEmpty)

const notIsNil = compose(not, isNil)

module.exports = {
  isNilOrEmpty,
  notIsNilOrEmpty,
  notIsNil
}

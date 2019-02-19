const { compose, isNil, isEmpty, or, not } = require('ramda')

const isNilOrEmpty = (string) => or(isNil(string), isEmpty(string))

const notIsNilOrEmpty = compose(not, isNilOrEmpty)

module.exports = {
  isNilOrEmpty,
  notIsNilOrEmpty
}

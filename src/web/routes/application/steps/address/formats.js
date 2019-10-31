const { isString } = require('../../../../common/predicates')

const SINGLE_WORD_REGEX = /\b\w+/g

const toTitleCase = (str) => {
  return !isString(str) ? str : str.replace(
    SINGLE_WORD_REGEX,
    function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() }
  )
}

module.exports = {
  SINGLE_WORD_REGEX,
  toTitleCase
}

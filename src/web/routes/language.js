const { isNilOrEmpty } = require('../../common/predicates')

const getLanguageBase = (language) => {
  if (isNilOrEmpty(language)) {
    throw new Error('language provided in the request is blank')
  }
  return language.split('-')[0]
}

module.exports = {
  getLanguageBase
}

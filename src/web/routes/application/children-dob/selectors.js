const { pickBy } = require('ramda')
const { isNotChildEntry, isChildEntry, keyDoesNotContainIndex } = require('./predicates')

const getNonChildEntries = pickBy(isNotChildEntry)

const getChildEntries = pickBy(isChildEntry)

const omitKeysWithIndex = (entries, index) => pickBy(keyDoesNotContainIndex(index), entries)

module.exports = {
  getChildEntries,
  getNonChildEntries,
  omitKeysWithIndex
}

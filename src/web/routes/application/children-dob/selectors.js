const { pickBy } = require('ramda')
const { isNotChildEntry, isChildEntry, keyDoesNotContainIndex } = require('./predicates')

const getNonChildEntries = pickBy(isNotChildEntry)

const getChildEntries = pickBy(isChildEntry)

const getEntriesWithoutIndex = (entries, index) => pickBy(keyDoesNotContainIndex(index), entries)

module.exports = {
  getChildEntries,
  getNonChildEntries,
  getEntriesWithoutIndex
}

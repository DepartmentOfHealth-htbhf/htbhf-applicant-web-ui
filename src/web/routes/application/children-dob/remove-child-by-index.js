const { compose, map, toPairs, fromPairs } = require('ramda')
const { handleDecrement } = require('./decrement-keys')
const { getChildEntries, getNonChildEntries, getEntriesWithoutIndex } = require('./selectors')

const reIndexChildren = (children, index) => compose(fromPairs, map(handleDecrement(index)), toPairs)(children)

/**
 * Remove all 'childDob-x' entries from the session object (children) where x matches the index by:
 *  - Get all the entries from the session that start with 'childDob-'
 *  - Remove all entries which are for the given index ('childDob-x')
 *  - Rebuild the object with the remaining children entries re-indexed plus everything else (non-'childDob-x' entries)
 */
const removeChildByIndex = (children, index) => {
  const childEntries = getChildEntries(children)
  const filteredChildren = getEntriesWithoutIndex(childEntries, index)

  return {
    ...reIndexChildren(filteredChildren, index),
    ...getNonChildEntries(children)
  }
}

module.exports = {
  removeChildByIndex
}

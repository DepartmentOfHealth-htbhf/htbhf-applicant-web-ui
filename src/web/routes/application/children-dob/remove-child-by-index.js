const { pickBy, compose, map, toPairs, fromPairs } = require('ramda')
const { handleDecrement } = require('./decrement-keys')
const { keyDoesNotContainIndex, isChildEntry } = require('./predicates')
const { partitionObj } = require('./partition-obj')

const omitKeysWithIndex = (entries, index) => pickBy(keyDoesNotContainIndex(index), entries)

const reIndexChildren = (children, index) => compose(fromPairs, map(handleDecrement(index)), toPairs)(children)

/**
 * Remove all 'childDob-x' entries from the session object (children) where x matches the index by:
 *  - Get all the entries from the session that start with 'childDob-'
 *  - Remove all entries which are for the given index ('childDob-x')
 *  - Rebuild the object with the remaining children entries re-indexed plus everything else (non-'childDob-x' entries)
 */
const removeChildByIndex = (children, index) => {
  const partitioned = partitionObj(isChildEntry, children)
  const filteredChildren = omitKeysWithIndex(partitioned.matches, parseInt(index, 10))

  return {
    ...reIndexChildren(filteredChildren, index),
    ...partitioned.others
  }
}

module.exports = {
  removeChildByIndex
}

const { compose, map, isNil, pickBy, toPairs, fromPairs } = require('ramda')

const INDEX_FROM_KEY_REG_EXP = /.*-(\d+).*/

const getIndexFromKey = (key) => {
  const groups = INDEX_FROM_KEY_REG_EXP.exec(key)

  if (isNil(groups)) {
    throw new Error(`Could not find index for key ${key}`)
  }

  return parseInt(groups[1], 10)
}

const isKeyAfterRemoved = (key, index) => getIndexFromKey(key) > index

const decrementKey = (key) => {
  const index = getIndexFromKey(key)

  if (index <= 1) {
    throw new Error(`Unable to decrement index for key ${key}`)
  }

  return key.replace(index, index - 1)
}

const keyDoesNotContainIndex = (index) => (val, key) => getIndexFromKey(key) !== index

const handleDecrement = (index) => (pair) => {
  const key = pair[0]

  if (isKeyAfterRemoved(key, index)) {
    return [decrementKey(key), pair[1]]
  }

  return pair
}

const reIndexChildren = (children, index) => compose(fromPairs, map(handleDecrement(index)), toPairs)(children)

const removeChildByIndex = (children, index) => {
  const childDobPrefix = 'childDob-'

  const metaEntries = pickBy((val, key) => !key.startsWith(childDobPrefix), children)
  const childEntries = pickBy((val, key) => key.startsWith(childDobPrefix), children)

  const filteredChildren = pickBy(keyDoesNotContainIndex(index), childEntries)

  return {
    ...reIndexChildren(filteredChildren, index),
    ...metaEntries
  }
}

module.exports = {
  isKeyAfterRemoved,
  decrementKey,
  keyDoesNotContainIndex,
  removeChildByIndex
}

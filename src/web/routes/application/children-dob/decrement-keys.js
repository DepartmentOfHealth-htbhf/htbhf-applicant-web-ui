const { isNil } = require('ramda')

const KEY_INDEX_REG_EXP = /.*-(\d+).*/

const getIndexFromKey = (key) => {
  const groups = KEY_INDEX_REG_EXP.exec(key)

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

const handleDecrement = (index) => ([key, value]) => isKeyAfterRemoved(key, index) ? [decrementKey(key), value] : [key, value]

module.exports = {
  handleDecrement,
  decrementKey,
  getIndexFromKey,
  isKeyAfterRemoved
}

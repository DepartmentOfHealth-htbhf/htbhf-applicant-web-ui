const { isNil } = require('ramda')

const isKeyAfterRemoved = (key, index) => {
  const getIndexFromKeyRegExp = /.*-(\d+).*/
  const match = getIndexFromKeyRegExp.exec(key)

  if (isNil(match)) {
    throw new Error(`Could not find index ${index} for key ${key}`)
  }

  return parseInt(match[1], 10) > index
}

module.exports = {
  isKeyAfterRemoved
}

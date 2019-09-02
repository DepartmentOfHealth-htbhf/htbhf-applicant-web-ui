const { isUndefined } = require('../../../common/predicates')

const toBooleanStrict = value => {
  if (isUndefined(value)) {
    return undefined
  }

  if (value === 'true' || value === true) {
    return true
  }

  if (value === 'false' || value === false) {
    return false
  }

  throw new Error(`Can’t coerce ${value} to boolean`)
}

module.exports = {
  toBooleanStrict
}

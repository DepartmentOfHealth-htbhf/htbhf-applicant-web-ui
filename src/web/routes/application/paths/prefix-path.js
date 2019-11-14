const { isUndefined, isString } = require('../../../../common/predicates')

const isInvalidSegment = segment => !isString(segment) || !segment.startsWith('/')

const prefixPath = (prefix, path) => {
  if (isInvalidSegment(path)) {
    throw new Error(`Invalid path "${path}". Path must be a string starting with "/"`)
  }

  if (isUndefined(prefix)) {
    return path
  }

  if (isInvalidSegment(prefix)) {
    throw new Error(`Invalid prefix "${prefix}". Prefix must be a string starting with "/"`)
  }

  return `${prefix}${path}`
}

module.exports = {
  prefixPath
}

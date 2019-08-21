const partitionObj = (predicate, obj) => {
  const matches = {}
  const others = {}

  Object.keys(obj).forEach(key => {
    if (predicate(obj[key], key)) {
      matches[key] = obj[key]
    } else {
      others[key] = obj[key]
    }
  })

  return {
    matches,
    others
  }
}

module.exports = {
  partitionObj
}

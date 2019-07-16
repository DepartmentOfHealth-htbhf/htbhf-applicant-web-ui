const partitionObj = (predicate, obj) => {
  const obj1 = {}
  const obj2 = {}

  Object.keys(obj).forEach(key => {
    if (predicate(obj[key], key)) {
      obj1[key] = obj[key]
    } else {
      obj2[key] = obj[key]
    }
  })

  return [obj1, obj2]
}

module.exports = {
  partitionObj
}

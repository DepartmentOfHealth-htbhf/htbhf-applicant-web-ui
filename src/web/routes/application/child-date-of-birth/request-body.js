const { isNil } = require('ramda')

const createChildrenDobArray = (children) => {
  if (isNil(children)) {
    return null
  }

  let childrenArray = []
  for (let i = 1; i <= children.childCount; i++) {
    const childDobKey = `childDob-${i}`
    const childDob = children[childDobKey]
    if (typeof childDob === 'undefined') {
      throw new Error(`No child date of birth stored in session for ${childDobKey}`)
    }
    childrenArray.push(childDob)
  }
  return childrenArray
}

const requestBody = (session) => ({
  childrenDob: createChildrenDobArray(session.children)
})

module.exports = {
  createChildrenDobArray,
  requestBody
}

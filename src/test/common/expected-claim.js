const { isNil } = require('ramda')

const expectedClaim = {}

const resetExpectedClaim = () => {
  for (let variableKey in expectedClaim) {
    if (expectedClaim.hasOwnProperty(variableKey)) {
      delete expectedClaim[variableKey]
    }
  }
}

const addChildToExpectedClaim = (dob) => {
  if (isNil(expectedClaim.childrenDob)) {
    expectedClaim.childrenDob = []
  }
  expectedClaim.childrenDob.push(dob)
}

module.exports = {
  expectedClaim,
  resetExpectedClaim,
  addChildToExpectedClaim
}

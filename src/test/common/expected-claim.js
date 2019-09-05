const { isNil } = require('ramda')

class ExpectedClaim {
  constructor () {
    this.claim = {}
  }
  reset () {
    this.claim = {}
  }
  addChild (dob) {
    if (isNil(this.claim.childrenDob)) {
      this.claim.childrenDob = []
    }
    this.claim.childrenDob.push(dob)
  }
  setProperty (propName, propValue) {
    this.claim[propName] = propValue
  }
  getBody () {
    return JSON.parse(JSON.stringify(this.claim))
  }
}

const expectedClaim = new ExpectedClaim()

module.exports = {
  expectedClaim
}

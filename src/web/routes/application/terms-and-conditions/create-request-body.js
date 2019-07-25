const { isNil } = require('ramda')
const { toDateString } = require('../common/formatters')
const { YES } = require('../common/constants')

const createExpectedDeliveryDate = (claim) => {
  if (claim.areYouPregnant === YES) {
    return toDateString(
      claim['expectedDeliveryDate-day'],
      claim['expectedDeliveryDate-month'],
      claim['expectedDeliveryDate-year']
    )
  }
  return null
}

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

const createClaim = (claim, children) => ({
  firstName: claim.firstName,
  lastName: claim.lastName,
  nino: claim.nino,
  dateOfBirth: claim.dateOfBirth,
  address: {
    addressLine1: claim.addressLine1,
    addressLine2: claim.addressLine2,
    townOrCity: claim.townOrCity,
    postcode: claim.postcode
  },
  expectedDeliveryDate: createExpectedDeliveryDate(claim),
  phoneNumber: claim.formattedPhoneNumber,
  emailAddress: claim.emailAddress,
  childrenDob: createChildrenDobArray(children)
})

const createDeviceFingerprint = (headers) => ({
  'user-agent': headers['user-agent'],
  'ip-address': headers['x-forwarded-for'],
  'accept': headers['accept'],
  'accept-encoding': headers['accept-encoding'],
  'accept-language': headers['accept-language']
})

const createRequestBody = (config, req) => ({
  claimant: createClaim(req.session.claim, req.session.children),
  deviceFingerprint: createDeviceFingerprint(req.headers),
  webUIVersion: config.environment.APP_VERSION
})

module.exports = {
  createRequestBody,
  createChildrenDobArray
}

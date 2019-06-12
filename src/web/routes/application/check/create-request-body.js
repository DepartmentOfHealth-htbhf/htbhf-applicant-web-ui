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

const createClaim = (claim) => ({
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
  phoneNumber: claim.formattedPhoneNumber
})

const createDeviceFingerprint = (headers) => ({
  'user-agent': headers['user-agent'],
  'ip-address': headers['x-forwarded-for'],
  'accept': headers['accept'],
  'accept-encoding': headers['accept-encoding'],
  'accept-language': headers['accept-language']
})

const createRequestBody = (req) => ({
  claimant: createClaim(req.session.claim),
  deviceFingerprint: createDeviceFingerprint(req.headers)
})

module.exports = {
  createRequestBody
}

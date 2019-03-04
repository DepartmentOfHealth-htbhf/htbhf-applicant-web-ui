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

const createRequestBody = (claim) => {
  return {
    firstName: claim.firstName,
    lastName: claim.lastName,
    nino: claim.nino,
    dateOfBirth: claim.dateOfBirth,
    cardDeliveryAddress: {
      addressLine1: claim.addressLine1,
      addressLine2: claim.addressLine2,
      townOrCity: claim.townOrCity,
      postcode: claim.postcode
    },
    expectedDeliveryDate: createExpectedDeliveryDate(claim)
  }
}

module.exports = {
  createRequestBody
}

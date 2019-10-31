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

const requestBody = (session) => ({
  expectedDeliveryDate: createExpectedDeliveryDate(session.claim)
})

module.exports = {
  requestBody
}

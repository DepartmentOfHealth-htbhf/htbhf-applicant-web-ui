const { YES } = require('./constants')
const { toDateString } = require('../common/formatters')

const transformData = (req) => {
  if (req.body.areYouPregnant === YES) {
    const expectedDeliveryDate = toDateString(
      req.body['expectedDeliveryDate-day'],
      req.body['expectedDeliveryDate-month'],
      req.body['expectedDeliveryDate-year']
    )
    return { areYouPregnant: req.body.areYouPregnant, expectedDeliveryDate: expectedDeliveryDate }
  }
  return { areYouPregnant: req.body.areYouPregnant, expectedDeliveryDate: null }
}

module.exports.transformData = transformData

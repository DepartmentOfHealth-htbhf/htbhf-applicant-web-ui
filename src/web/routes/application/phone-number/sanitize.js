const { parsePhoneNumberFromString } = require('libphonenumber-js')
const { path } = require('ramda')

function getPhoneNumber (phoneNumber) {
  const parsedNumber = parsePhoneNumberFromString(phoneNumber, 'GB')
  return path(['number'], parsedNumber)
}

const sanitize = () => (req, res, next) => {
  // Do not mutate the phone number as users will want to see it in the format they entered it on the check page
  // See https://design-system.service.gov.uk/patterns/telephone-numbers/
  req.body.formattedPhoneNumber = getPhoneNumber(req.body.phoneNumber)
  next()
}

module.exports = {
  sanitize,
  getPhoneNumber
}

const { parsePhoneNumberFromString } = require('libphonenumber-js')

function getPhoneNumber (phoneNumber) {
  if (!phoneNumber) {
    return undefined
  }

  return parsePhoneNumberFromString(phoneNumber, 'GB')
}

const sanitize = (req, res, next) => {
  // Do not mutate the phone number as users will want to see it in the format they entered it in on the check page
  // See https://design-system.service.gov.uk/patterns/telephone-numbers/
  req.body.parsedPhoneNumber = getPhoneNumber(req.body.phoneNumber)
  next()
}

module.exports = {
  sanitize,
  getPhoneNumber
}
